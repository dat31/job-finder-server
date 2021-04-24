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
const User_1 = __importDefault(require("./User"));
const Post_1 = __importDefault(require("./Post"));
let Updoot = class Updoot extends typeorm_1.BaseEntity {
};
__decorate([
    type_graphql_1.Field(),
    typeorm_1.PrimaryColumn(),
    __metadata("design:type", Number)
], Updoot.prototype, "userId", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.PrimaryColumn(),
    __metadata("design:type", Number)
], Updoot.prototype, "postId", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column(),
    __metadata("design:type", Number)
], Updoot.prototype, "value", void 0);
__decorate([
    type_graphql_1.Field(() => User_1.default),
    typeorm_1.ManyToOne(() => User_1.default, user => user.updoots),
    __metadata("design:type", User_1.default)
], Updoot.prototype, "user", void 0);
__decorate([
    type_graphql_1.Field(() => Post_1.default),
    typeorm_1.ManyToOne(() => Post_1.default, post => post.updoots, { onDelete: "CASCADE" }),
    __metadata("design:type", Post_1.default)
], Updoot.prototype, "post", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.CreateDateColumn(),
    __metadata("design:type", Date)
], Updoot.prototype, "createdAt", void 0);
Updoot = __decorate([
    type_graphql_1.ObjectType(),
    typeorm_1.Entity()
], Updoot);
exports.default = Updoot;
//# sourceMappingURL=Updoot.js.map