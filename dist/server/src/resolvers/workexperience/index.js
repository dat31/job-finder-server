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
const typedi_1 = require("typedi");
const type_graphql_1 = require("type-graphql");
const entities_1 = require("../../entities");
const workexp_service_1 = __importDefault(require("./workexp.service"));
const workexp_type_1 = require("./workexp.type");
let WorkExperienceResolver = class WorkExperienceResolver {
    constructor(service) {
        this.service = service;
    }
    createWorkExperience(ctx, { workExperience }) {
        const { userId } = ctx.req.session;
        return this.service.create(Object.assign(Object.assign({}, workExperience), { userId }));
    }
    updateWorkExperience(ctx, { workExperience }) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.service.update(workExperience.id, workExperience);
            return result.userId ? result : (Object.assign(Object.assign({}, result), { userId: ctx.req.session.userId }));
        });
    }
    deleteWorkExperience(ctx, { id }) {
        return this.service.delete(id);
    }
};
__decorate([
    type_graphql_1.Authorized(),
    type_graphql_1.Mutation(() => entities_1.WorkExperience),
    __param(0, type_graphql_1.Ctx()),
    __param(1, type_graphql_1.Args()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, workexp_type_1.CreateWorkExpArgs]),
    __metadata("design:returntype", void 0)
], WorkExperienceResolver.prototype, "createWorkExperience", null);
__decorate([
    type_graphql_1.Authorized(),
    type_graphql_1.Mutation(() => entities_1.WorkExperience),
    __param(0, type_graphql_1.Ctx()),
    __param(1, type_graphql_1.Args()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, workexp_type_1.UpdateWorkExpArgs]),
    __metadata("design:returntype", Promise)
], WorkExperienceResolver.prototype, "updateWorkExperience", null);
__decorate([
    type_graphql_1.Authorized(),
    type_graphql_1.Mutation(() => type_graphql_1.Int),
    __param(0, type_graphql_1.Ctx()),
    __param(1, type_graphql_1.Args()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, workexp_type_1.DeleteWorkExpArgs]),
    __metadata("design:returntype", Promise)
], WorkExperienceResolver.prototype, "deleteWorkExperience", null);
WorkExperienceResolver = __decorate([
    typedi_1.Service(),
    type_graphql_1.Resolver(entities_1.WorkExperience),
    __metadata("design:paramtypes", [workexp_service_1.default])
], WorkExperienceResolver);
exports.default = WorkExperienceResolver;
//# sourceMappingURL=index.js.map