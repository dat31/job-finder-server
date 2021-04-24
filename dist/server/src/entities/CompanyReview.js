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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const type_graphql_1 = require("type-graphql");
const base_1 = require("../base");
const Company_1 = __importDefault(require("./Company"));
let CompanyReview = class CompanyReview extends base_1.BaseEntity {
};
__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column(),
    __metadata("design:type", String)
], CompanyReview.prototype, "title", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column(),
    __metadata("design:type", String)
], CompanyReview.prototype, "text", void 0);
__decorate([
    type_graphql_1.Field(() => Company_1.default),
    typeorm_1.ManyToOne(() => Company_1.default, company => company.reviews),
    __metadata("design:type", Company_1.default)
], CompanyReview.prototype, "company", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column(),
    __metadata("design:type", Number)
], CompanyReview.prototype, "stars", void 0);
__decorate([
    type_graphql_1.Field(() => type_graphql_1.Int),
    typeorm_1.Column(),
    __metadata("design:type", Object)
], CompanyReview.prototype, "companyId", void 0);
CompanyReview = __decorate([
    type_graphql_1.ObjectType(),
    typeorm_1.Entity()
], CompanyReview);
exports.default = CompanyReview;
//# sourceMappingURL=CompanyReview.js.map