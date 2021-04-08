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
const company_service_1 = __importDefault(require("./company.service"));
const company_type_1 = require("./company.type");
let CompanyResolver = class CompanyResolver {
    constructor(companyService) {
        this.companyService = companyService;
    }
    companies() {
        return this.companyService.getAll();
    }
    createCompany(company) {
        return this.companyService.create(company);
    }
};
__decorate([
    type_graphql_1.Query(() => company_type_1.CompanyResponse),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CompanyResolver.prototype, "companies", null);
__decorate([
    type_graphql_1.Mutation(() => entities_1.Company),
    __param(0, type_graphql_1.Arg('company')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [company_type_1.CompanyInput]),
    __metadata("design:returntype", Promise)
], CompanyResolver.prototype, "createCompany", null);
CompanyResolver = __decorate([
    typedi_1.Service(),
    type_graphql_1.Resolver(entities_1.Company),
    __metadata("design:paramtypes", [company_service_1.default])
], CompanyResolver);
exports.default = CompanyResolver;
//# sourceMappingURL=index.js.map