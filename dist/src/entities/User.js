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
const type_graphql_1 = require("type-graphql");
const typeorm_1 = require("typeorm");
const Post_1 = __importDefault(require("./Post"));
const Updoot_1 = __importDefault(require("./Updoot"));
const BaseEntity_1 = __importDefault(require("../base/BaseEntity"));
const WorkExperience_1 = __importDefault(require("./WorkExperience"));
const WorkSkill_1 = __importDefault(require("./WorkSkill"));
var Roles;
(function (Roles) {
    Roles["COMPANY"] = "COMPANY";
    Roles["CANDIDATE"] = "CANDIDATE";
})(Roles || (Roles = {}));
let User = class User extends BaseEntity_1.default {
};
__decorate([
    typeorm_1.OneToMany(() => Post_1.default, post => post.creator),
    __metadata("design:type", Array)
], User.prototype, "posts", void 0);
__decorate([
    typeorm_1.OneToMany(() => Updoot_1.default, ud => ud.userId),
    __metadata("design:type", Array)
], User.prototype, "updoots", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column({ unique: true }),
    __metadata("design:type", String)
], User.prototype, "username", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column({ unique: true }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    typeorm_1.Column("int", {
        array: true,
        nullable: true
    }),
    __metadata("design:type", Array)
], User.prototype, "savedJobIds", void 0);
__decorate([
    typeorm_1.Column("int", {
        array: true,
        nullable: true
    }),
    __metadata("design:type", Object)
], User.prototype, "notInterestedJobIds", void 0);
__decorate([
    typeorm_1.Column("int", {
        array: true,
        nullable: true,
    }),
    __metadata("design:type", Object)
], User.prototype, "reportedJobIds", void 0);
__decorate([
    type_graphql_1.Field(() => [WorkExperience_1.default]),
    typeorm_1.OneToMany(() => WorkExperience_1.default, workExp => workExp.userId),
    __metadata("design:type", Array)
], User.prototype, "workExperiences", void 0);
__decorate([
    type_graphql_1.Field(() => [WorkSkill_1.default]),
    typeorm_1.OneToMany(() => WorkSkill_1.default, workSkill => workSkill.userId),
    __metadata("design:type", Array)
], User.prototype, "workSkills", void 0);
User = __decorate([
    type_graphql_1.ObjectType(),
    typeorm_1.Entity()
], User);
exports.default = User;
//# sourceMappingURL=User.js.map