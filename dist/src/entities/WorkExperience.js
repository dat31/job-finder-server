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
const base_1 = require("../base");
const typeorm_1 = require("typeorm");
const type_graphql_1 = require("type-graphql");
const User_1 = __importDefault(require("./User"));
let WorkExperience = class WorkExperience extends base_1.BaseEntity {
};
__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column(),
    __metadata("design:type", String)
], WorkExperience.prototype, "jobTitle", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column(),
    __metadata("design:type", String)
], WorkExperience.prototype, "company", void 0);
__decorate([
    type_graphql_1.Field({ nullable: true }),
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], WorkExperience.prototype, "from", void 0);
__decorate([
    type_graphql_1.Field({ nullable: true }),
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], WorkExperience.prototype, "to", void 0);
__decorate([
    type_graphql_1.Field(() => User_1.default),
    typeorm_1.ManyToOne(() => User_1.default, user => user.workExperiences, { onDelete: "CASCADE" }),
    __metadata("design:type", User_1.default)
], WorkExperience.prototype, "user", void 0);
__decorate([
    type_graphql_1.Field(() => type_graphql_1.Int),
    typeorm_1.Column(),
    __metadata("design:type", Object)
], WorkExperience.prototype, "userId", void 0);
WorkExperience = __decorate([
    typeorm_1.Entity(),
    type_graphql_1.ObjectType()
], WorkExperience);
exports.default = WorkExperience;
//# sourceMappingURL=WorkExperience.js.map