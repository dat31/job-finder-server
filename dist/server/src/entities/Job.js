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
exports.EmploymentType = void 0;
const BaseEntity_1 = __importDefault(require("../base/BaseEntity"));
const type_graphql_1 = require("type-graphql");
const typeorm_1 = require("typeorm");
const Company_1 = __importDefault(require("./Company"));
var EmploymentType;
(function (EmploymentType) {
    EmploymentType["FULL_TIME"] = "FULL_TIME";
    EmploymentType["PART_TIME"] = "PART_TIME";
})(EmploymentType = exports.EmploymentType || (exports.EmploymentType = {}));
let Job = class Job extends BaseEntity_1.default {
};
__decorate([
    type_graphql_1.Field(() => String),
    typeorm_1.Column(),
    __metadata("design:type", String)
], Job.prototype, "title", void 0);
__decorate([
    type_graphql_1.Field(() => Company_1.default),
    typeorm_1.ManyToOne(() => Company_1.default, company => company.jobs, { onDelete: "CASCADE" }),
    __metadata("design:type", Company_1.default)
], Job.prototype, "company", void 0);
__decorate([
    type_graphql_1.Field(() => type_graphql_1.Int),
    typeorm_1.Column(),
    __metadata("design:type", Object)
], Job.prototype, "companyId", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], Job.prototype, "description", void 0);
__decorate([
    type_graphql_1.Field({ nullable: true }),
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], Job.prototype, "requirements", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column({
        type: 'enum',
        enum: EmploymentType,
        nullable: true,
        default: EmploymentType.FULL_TIME,
    }),
    __metadata("design:type", String)
], Job.prototype, "employmentType", void 0);
__decorate([
    type_graphql_1.Field(() => String),
    typeorm_1.Column({ type: 'simple-array', nullable: true }),
    __metadata("design:type", Array)
], Job.prototype, "salary", void 0);
__decorate([
    type_graphql_1.Field({ nullable: true }),
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], Job.prototype, "applicationDeadline", void 0);
__decorate([
    type_graphql_1.Field(() => type_graphql_1.Int, { nullable: true }),
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", Number)
], Job.prototype, "experience", void 0);
__decorate([
    type_graphql_1.Field(() => type_graphql_1.Int, { nullable: true }),
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", Number)
], Job.prototype, "viewCount", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", Boolean)
], Job.prototype, "hasBeenSaved", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", Boolean)
], Job.prototype, "hasBeenReported", void 0);
Job = __decorate([
    typeorm_1.Entity(),
    type_graphql_1.ObjectType()
], Job);
exports.default = Job;
//# sourceMappingURL=Job.js.map