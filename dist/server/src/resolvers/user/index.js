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
const constants_1 = require("../../constants");
const typedi_1 = require("typedi");
const user_type_1 = require("./user.type");
const user_service_1 = __importDefault(require("./user.service"));
let UserResolver = class UserResolver {
    constructor(userService) {
        this.userService = userService;
    }
    email(user, ctx) {
        return (ctx.req.session.userId === user.id) ? user.email : null;
    }
    changePassword({ req }, changePasswordReq) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.userService.changePassword(changePasswordReq, userId => {
                req.session.userId = userId;
            });
        });
    }
    currentUser(ctx) {
        return this.userService.getCurrentUser(ctx.req.session.userId);
    }
    profile(ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.userService.getProfile(ctx.req.session.userId);
        });
    }
    register(options, ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.userService.register(options, userId => {
                ctx.req.session.userId = userId;
            });
        });
    }
    login(loginReq, ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.userService.login(loginReq, userId => ctx.req.session.userId = userId);
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
    forgotPassword(email) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.userService.forgotPassword(email);
        });
    }
    saveJob(jobId, ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.userService.saveJob(ctx.req.session.userId, jobId);
        });
    }
    notInterestedJob(jobId, ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.userService.notInterestedJob(ctx.req.session.userId, jobId);
        });
    }
    myJobs(ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.userService.getAllCurrentUserJobs(ctx.req.session.userId);
        });
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
    __param(1, type_graphql_1.Args()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, user_type_1.ChangePasswordReq]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "changePassword", null);
__decorate([
    type_graphql_1.Query(() => entities_1.User, { nullable: true }),
    __param(0, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UserResolver.prototype, "currentUser", null);
__decorate([
    type_graphql_1.Query(() => user_type_1.ProfileResponse, { nullable: true }),
    __param(0, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "profile", null);
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
    __param(0, type_graphql_1.Args()),
    __param(1, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_type_1.LoginReq, Object]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "login", null);
__decorate([
    type_graphql_1.Authorized(),
    type_graphql_1.Mutation(() => Boolean),
    __param(0, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UserResolver.prototype, "logout", null);
__decorate([
    type_graphql_1.Mutation(() => Boolean),
    __param(0, type_graphql_1.Arg("email")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "forgotPassword", null);
__decorate([
    type_graphql_1.Authorized(),
    type_graphql_1.Mutation(() => Boolean),
    __param(0, type_graphql_1.Arg("jobId")),
    __param(1, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "saveJob", null);
__decorate([
    type_graphql_1.Authorized(),
    type_graphql_1.Mutation(() => Boolean),
    __param(0, type_graphql_1.Arg("jobId")),
    __param(1, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "notInterestedJob", null);
__decorate([
    type_graphql_1.Query(() => user_type_1.CurrentUserJobs),
    __param(0, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "myJobs", null);
UserResolver = __decorate([
    typedi_1.Service(),
    type_graphql_1.Resolver(entities_1.User),
    __metadata("design:paramtypes", [user_service_1.default])
], UserResolver);
exports.default = UserResolver;
//# sourceMappingURL=index.js.map