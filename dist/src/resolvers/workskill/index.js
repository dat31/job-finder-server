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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typedi_1 = require("typedi");
const type_graphql_1 = require("type-graphql");
const entities_1 = require("../../entities");
const workskill_service_1 = __importDefault(require("./workskill.service"));
const workskill_type_1 = require("./workskill.type");
let WorkSkillResolver = class WorkSkillResolver {
    constructor(service) {
        this.service = service;
    }
    createWorkSkill(ctx, { workSkill }) {
        const { userId } = ctx.req.session;
        return this.service.create(Object.assign(Object.assign({}, workSkill), { userId }));
    }
    updateWorkSkill({ workSkill }) {
        return this.service.update(workSkill.id, workSkill);
    }
    deleteWorkSkill({ id }) {
        return this.service.delete(id);
    }
};
__decorate([
    type_graphql_1.Authorized(),
    type_graphql_1.Mutation(() => entities_1.WorkSkill),
    __param(0, type_graphql_1.Ctx()),
    __param(1, type_graphql_1.Args()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, workskill_type_1.CreateWorkSkillArgs]),
    __metadata("design:returntype", Promise)
], WorkSkillResolver.prototype, "createWorkSkill", null);
__decorate([
    type_graphql_1.Authorized(),
    type_graphql_1.Mutation(() => entities_1.WorkSkill),
    __param(0, type_graphql_1.Args()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [workskill_type_1.UpdateWorkSkillArgs]),
    __metadata("design:returntype", Promise)
], WorkSkillResolver.prototype, "updateWorkSkill", null);
__decorate([
    type_graphql_1.Authorized(),
    type_graphql_1.Mutation(() => type_graphql_1.Int),
    __param(0, type_graphql_1.Args()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [workskill_type_1.DeleteWorkSkillArgs]),
    __metadata("design:returntype", Promise)
], WorkSkillResolver.prototype, "deleteWorkSkill", null);
WorkSkillResolver = __decorate([
    typedi_1.Service(),
    type_graphql_1.Resolver(entities_1.WorkSkill),
    __metadata("design:paramtypes", [workskill_service_1.default])
], WorkSkillResolver);
exports.default = WorkSkillResolver;
//# sourceMappingURL=index.js.map