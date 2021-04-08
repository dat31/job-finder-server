"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const type_graphql_1 = require("type-graphql");
const entities_1 = require("../../entities");
const argon2_1 = __importDefault(require("argon2"));
const constants_1 = require("../../constants");
const uuid_1 = require("uuid");
const typedi_1 = require("typedi");
const user_type_1 = require("./user.type");
const stringUtils_1 = require("../../utils/stringUtils");
const user_service_1 = __importDefault(require("./user.service"));
const authMiddleware_1 = __importDefault(require("../../middlewares/authMiddleware"));
const user_helper_1 = require("./user.helper");
const sendEmail_1 = __importDefault(require("../../api/sendEmail"));
const DB_DUPLICATE_ERR_CODE = '23505';
const PASSWORD_LIMIT_LENGTH = 6;
let UserResolver = class UserResolver {
    constructor(userService) {
        this.userService = userService;
    }
    email(user, ctx) {
        return (ctx.req.session.userId === user.id) ? user.email : null;
    }
    changePassword({ redis, req }, token, newPassword) {
        return __awaiter(this, void 0, void 0, function* () {
            if (stringUtils_1.isValidLength(newPassword, PASSWORD_LIMIT_LENGTH)) {
                return this.getError('newPassword', 'New password length must be greater than 6');
            }
            try {
                const userId = yield redis.get(constants_1.FORGET_PASSWORD_PREFIX + token);
                if (!userId) {
                    return this.getError('token', 'Token expired');
                }
                const userIdInt = parseInt(userId);
                const user = yield entities_1.User.findOne(userIdInt);
                if (!user) {
                    return this.getError('token', 'User does not exists');
                }
                yield entities_1.User.update({ id: userIdInt }, { password: yield argon2_1.default.hash(newPassword) });
                req.session.userId = user.id;
                yield redis.del(constants_1.FORGET_PASSWORD_PREFIX + token);
                return { user };
            }
            catch (e) {
                console.log('-----CHANGE PW ERROR------', e);
                return this.getError('token', 'An error occurred, try again later');
            }
        });
    }
    me(ctx) {
        const { userId } = ctx.req.session;
        console.log("OKAY", ctx.req.session);
        if (!userId)
            return null;
        return entities_1.User.findOne(userId);
    }
    register(options, ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            let user;
            const { username, password, email } = options;
            const errors = user_helper_1.validateRegister(options);
            if (errors) {
                return { errors };
            }
            try {
                const result = yield entities_1.User
                    .create({ username, password: yield argon2_1.default.hash(password), email })
                    .save();
                user = result;
                ctx.req.session.userId = result.id;
            }
            catch (e) {
                if (e.code === DB_DUPLICATE_ERR_CODE) {
                    return this.getError('username', "username or email already existed");
                }
                return this.getError('form', "An error occurred! Try again later");
            }
            return { user };
        });
    }
    login(usernameOrEmail, password, ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            const column = usernameOrEmail.includes('@') ? 'email' : 'username';
            const user = yield entities_1.User.findOne({
                where: { [column]: usernameOrEmail }
            });
            if (!user) {
                return this.getError('usernameOrEmail', 'account does not exist!');
            }
            const valid = yield argon2_1.default.verify(user.password, password);
            if (!valid) {
                return this.getError('password', 'incorrect password');
            }
            ctx.req.session.userId = user.id;
            ctx.req.session.test1 = "test1";
            ctx.req.session.test2 = "test2";
            return {
                user
            };
        });
    }
    logout(ctx) {
        return new Promise((resolve) => (ctx.req.session.destroy((error) => {
            if (!error) {
                ctx.res.clearCookie(constants_1.COOKIE_NAME);
                resolve(true);
            }
            resolve(false);
        })));
    }
    forgotPassword(email, ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            const { redis } = ctx;
            const user = yield entities_1.User.findOne({ where: { email } });
            if (!user) {
                return;
            }
            const token = uuid_1.v4();
            yield redis.set(constants_1.FORGET_PASSWORD_PREFIX + token, user.id, 'ex', 1000 * 60 * 60 * 24 * 3);
            const html = `<a href="${process.env.CORS_ORIGIN}/change-password/${token}">reset password</a>`;
            const hehe = yield sendEmail_1.default(email, html);
            console.log('HEE', hehe);
            return true;
        });
    }
    saveJob(jobId, ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.updateJobIdColumn(ctx.req.session.userId, jobId, "savedJobIds");
        });
    }
    notInterestedJob(jobId, ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.updateJobIdColumn(ctx.req.session.userId, jobId, "notInterestedJobIds");
        });
    }
    updateJobIdColumn(userId, jobId, jobColumn) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userService.getById(userId);
            if (!user) {
                return false;
            }
            yield this.userService.update(userId, {
                [jobColumn]: [...user.savedJobIds, jobId]
            });
            return true;
        });
    }
    getError(field, message) {
        return {
            errors: [{ field, message }]
        };
    }
};
__decorate([
    type_graphql_1.FieldResolver(() => String),
    __param(0, type_graphql_1.Root()), __param(1, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [entities_1.User, Object]),
    __metadata("design:returntype", void 0)
], UserResolver.prototype, "email", null);
__decorate([
    type_graphql_1.Mutation(() => user_type_1.UserResponse),
    __param(0, type_graphql_1.Ctx()),
    __param(1, type_graphql_1.Arg('token')),
    __param(2, type_graphql_1.Arg('newPassword')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "changePassword", null);
__decorate([
    type_graphql_1.Query(() => entities_1.User, { nullable: true }),
    __param(0, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UserResolver.prototype, "me", null);
__decorate([
    type_graphql_1.Mutation(() => user_type_1.UserResponse),
    __param(0, type_graphql_1.Arg('options')),
    __param(1, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_type_1.RegisterInput, Object]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "register", null);
__decorate([
    type_graphql_1.Mutation(() => user_type_1.UserResponse),
    __param(0, type_graphql_1.Arg('usernameOrEmail')),
    __param(1, type_graphql_1.Arg('password')),
    __param(2, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "login", null);
__decorate([
    type_graphql_1.Mutation(() => Boolean),
    __param(0, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UserResolver.prototype, "logout", null);
__decorate([
    type_graphql_1.Mutation(() => Boolean),
    __param(0, type_graphql_1.Arg("email")), __param(1, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "forgotPassword", null);
__decorate([
    type_graphql_1.Mutation(() => Boolean),
    type_graphql_1.UseMiddleware(authMiddleware_1.default),
    __param(0, type_graphql_1.Arg("jobId")),
    __param(1, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "saveJob", null);
__decorate([
    type_graphql_1.Mutation(() => Boolean),
    type_graphql_1.UseMiddleware(authMiddleware_1.default),
    __param(0, type_graphql_1.Arg("jobId")),
    __param(1, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "notInterestedJob", null);
UserResolver = __decorate([
    typedi_1.Service(),
    type_graphql_1.Resolver(entities_1.User),
    __metadata("design:paramtypes", [user_service_1.default])
], UserResolver);
exports.default = UserResolver;
//# sourceMappingURL=index.js.map