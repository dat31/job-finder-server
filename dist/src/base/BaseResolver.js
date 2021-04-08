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
const type_graphql_1 = require("type-graphql");
const BaseService_1 = __importDefault(require("./BaseService"));
const index_1 = require("./index");
const typedi_1 = require("typedi");
const stringUtils_1 = require("../utils/stringUtils");
function BaseResolver(TEntityClass) {
    const entityName = stringUtils_1.capitalize(TEntityClass.name);
    let GetAllResponse = class GetAllResponse extends index_1.PaginatedResponse(TEntityClass) {
    };
    GetAllResponse = __decorate([
        type_graphql_1.ObjectType()
    ], GetAllResponse);
    let DeleteResponse = class DeleteResponse {
    };
    __decorate([
        type_graphql_1.Field(() => type_graphql_1.Int),
        __metadata("design:type", Number)
    ], DeleteResponse.prototype, "deletedId", void 0);
    DeleteResponse = __decorate([
        type_graphql_1.ObjectType()
    ], DeleteResponse);
    let BaseResolverClass = class BaseResolverClass {
        constructor(service) {
            this.service = service;
        }
        getAll(ctx, options) {
            return this.service.getAll(options);
        }
        getById(id) {
            return this.service.getById(id);
        }
        delete(id) {
            return this.service.delete(id);
        }
    };
    __decorate([
        type_graphql_1.Query(() => GetAllResponse, { name: `getAll${entityName}s` }),
        __param(0, type_graphql_1.Ctx()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object]),
        __metadata("design:returntype", Promise)
    ], BaseResolverClass.prototype, "getAll", null);
    __decorate([
        type_graphql_1.Query(() => TEntityClass, { name: `get${entityName}ById` }),
        __param(0, type_graphql_1.Arg("id", () => type_graphql_1.Int)),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Number]),
        __metadata("design:returntype", void 0)
    ], BaseResolverClass.prototype, "getById", null);
    __decorate([
        type_graphql_1.Mutation(() => DeleteResponse, { name: `delete${entityName}` }),
        __param(0, type_graphql_1.Arg("id", () => type_graphql_1.Int)),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Number]),
        __metadata("design:returntype", void 0)
    ], BaseResolverClass.prototype, "delete", null);
    BaseResolverClass = __decorate([
        typedi_1.Service(),
        type_graphql_1.Resolver(() => TEntityClass, { isAbstract: true }),
        __metadata("design:paramtypes", [BaseService_1.default])
    ], BaseResolverClass);
    return BaseResolverClass;
}
exports.default = BaseResolver;
//# sourceMappingURL=BaseResolver.js.map