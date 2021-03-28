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
exports.RegisterInput = void 0;
const type_graphql_1 = require("type-graphql");
const User_1 = require("../entities/User");
const argon2_1 = __importDefault(require("argon2"));
const constants_1 = require("../constants");
const validateRegister_1 = __importDefault(require("../utils/validateRegister"));
const sendEmail_1 = __importDefault(require("../utils/sendEmail"));
const uuid_1 = require("uuid");
let RegisterInput = class RegisterInput {
};
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], RegisterInput.prototype, "username", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], RegisterInput.prototype, "password", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], RegisterInput.prototype, "email", void 0);
RegisterInput = __decorate([
    type_graphql_1.InputType()
], RegisterInput);
exports.RegisterInput = RegisterInput;
let ErrorField = class ErrorField {
};
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], ErrorField.prototype, "field", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], ErrorField.prototype, "message", void 0);
ErrorField = __decorate([
    type_graphql_1.ObjectType()
], ErrorField);
let UserResponse = class UserResponse {
};
__decorate([
    type_graphql_1.Field(() => [ErrorField], { nullable: true }),
    __metadata("design:type", Array)
], UserResponse.prototype, "errors", void 0);
__decorate([
    type_graphql_1.Field(() => User_1.User, { nullable: true }),
    __metadata("design:type", User_1.User)
], UserResponse.prototype, "user", void 0);
UserResponse = __decorate([
    type_graphql_1.ObjectType()
], UserResponse);
const DUPLICATE_CODE = '23505';
let UserResolver = class UserResolver {
    email(user, ctx) {
        if (ctx.req.session.userId === user.id) {
            return user.email;
        }
        return "";
    }
    changePassword({ redis, req }, token, newPassword) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (newPassword.length < 6) {
                    return {
                        errors: [
                            {
                                field: 'newPassword',
                                message: 'new password length must be greater than 6'
                            }
                        ]
                    };
                }
                const userId = yield redis.get(constants_1.FORGET_PASSWORD_PREFIX + token);
                if (!userId) {
                    return {
                        errors: [
                            {
                                field: 'token',
                                message: 'token expired'
                            }
                        ]
                    };
                }
                const userIdInt = parseInt(userId);
                const user = yield User_1.User.findOne(userIdInt);
                if (!user) {
                    return {
                        errors: [{
                                field: 'token',
                                message: 'user no longer exists'
                            }]
                    };
                }
                yield User_1.User.update({ id: userIdInt }, { password: yield argon2_1.default.hash(newPassword) });
                req.session.userId = user.id;
                yield redis.del(constants_1.FORGET_PASSWORD_PREFIX + token);
                return { user };
            }
            catch (e) {
                console.log('-----CHANGE PW ERROR------', e);
                return {
                    errors: [
                        {
                            field: 'token',
                            message: 'an error occurred, try again later'
                        }
                    ]
                };
            }
        });
    }
    me(ctx) {
        const { userId } = ctx.req.session;
        return userId ? User_1.User.findOne(userId) : null;
    }
    register(options, ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            let user;
            const { username, password, email } = options;
            const errors = validateRegister_1.default(options);
            if (errors) {
                return { errors };
            }
            const hashedPassword = yield argon2_1.default.hash(password);
            try {
                const result = yield User_1.User.create({
                    username,
                    password: hashedPassword,
                    email
                }).save();
                user = result;
                ctx.req.session.userId = result.id;
            }
            catch (e) {
                if (e.code === DUPLICATE_CODE) {
                    return {
                        errors: [{
                                field: 'username',
                                message: "username or email already existed"
                            }]
                    };
                }
                return {
                    errors: [{
                            field: 'asd',
                            message: "asd"
                        }]
                };
            }
            return { user };
        });
    }
    login(usernameOrEmail, password, ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            const column = usernameOrEmail.includes('@') ? 'email' : 'username';
            const user = yield User_1.User.findOne({
                where: { [column]: usernameOrEmail }
            });
            if (!user) {
                return {
                    errors: [{
                            field: 'usernameOrEmail',
                            message: 'account does not exist!'
                        }],
                };
            }
            const valid = yield argon2_1.default.verify(user.password, password);
            if (!valid) {
                return {
                    errors: [{
                            field: 'password',
                            message: 'incorrect password'
                        }],
                };
            }
            ctx.req.session.userId = user.id;
            return {
                user
            };
        });
    }
    logout(ctx) {
        return new Promise(resolve => (ctx.req.session.destroy((error) => {
            console.log('LOGOUT RES', error);
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
            const user = yield User_1.User.findOne({ where: { email } });
            if (!user) {
                return true;
            }
            const token = uuid_1.v4();
            yield redis.set(constants_1.FORGET_PASSWORD_PREFIX + token, user.id, 'ex', 1000 * 60 * 60 * 24 * 3);
            const html = `<a href="http://localhost:3000/change-password/${token}">reset password</a>`;
            const hehe = yield sendEmail_1.default(email, html);
            console.log('HEE', hehe);
            return true;
        });
    }
};
__decorate([
    type_graphql_1.FieldResolver(() => String),
    __param(0, type_graphql_1.Root()), __param(1, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [User_1.User, Object]),
    __metadata("design:returntype", void 0)
], UserResolver.prototype, "email", null);
__decorate([
    type_graphql_1.Mutation(() => UserResponse),
    __param(0, type_graphql_1.Ctx()),
    __param(1, type_graphql_1.Arg('token')),
    __param(2, type_graphql_1.Arg('newPassword')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "changePassword", null);
__decorate([
    type_graphql_1.Query(() => User_1.User, { nullable: true }),
    __param(0, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UserResolver.prototype, "me", null);
__decorate([
    type_graphql_1.Mutation(() => UserResponse),
    __param(0, type_graphql_1.Arg('options')),
    __param(1, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [RegisterInput, Object]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "register", null);
__decorate([
    type_graphql_1.Mutation(() => UserResponse),
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
    __param(0, type_graphql_1.Arg("email")),
    __param(1, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "forgotPassword", null);
UserResolver = __decorate([
    type_graphql_1.Resolver(User_1.User)
], UserResolver);
exports.default = UserResolver;
//# sourceMappingURL=user.js.map