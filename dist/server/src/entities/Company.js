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
const BaseEntity_1 = __importDefault(require("../base/BaseEntity"));
const typeorm_1 = require("typeorm");
const type_graphql_1 = require("type-graphql");
const Job_1 = __importDefault(require("./Job"));
const CompanyReview_1 = __importDefault(require("./CompanyReview"));
var Industry;
(function (Industry) {
    Industry["INDUSTRY1"] = "INDUSTRY1";
    Industry["INDUSTRY2"] = "INDUSTRY2";
})(Industry || (Industry = {}));
let Company = class Company extends BaseEntity_1.default {
};
__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column(),
    __metadata("design:type", String)
], Company.prototype, "name", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column(),
    __metadata("design:type", String)
], Company.prototype, "location", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column({ type: 'enum', enum: Industry, nullable: true }),
    __metadata("design:type", String)
], Company.prototype, "industry", void 0);
__decorate([
    type_graphql_1.Field(() => Job_1.default, { nullable: true }),
    typeorm_1.OneToMany(() => Job_1.default, job => job.company),
    __metadata("design:type", Array)
], Company.prototype, "jobs", void 0);
__decorate([
    type_graphql_1.Field(() => CompanyReview_1.default, { nullable: true }),
    typeorm_1.OneToMany(() => CompanyReview_1.default, review => review.company),
    __metadata("design:type", Array)
], Company.prototype, "reviews", void 0);
Company = __decorate([
    typeorm_1.Entity(),
    type_graphql_1.ObjectType()
], Company);
exports.default = Company;
//# sourceMappingURL=Company.js.map