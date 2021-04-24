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
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteWorkSkillArgs = exports.UpdateWorkSkillArgs = exports.CreateWorkSkillArgs = void 0;
const type_graphql_1 = require("type-graphql");
let CreateUpdateWorkSkillInput = class CreateUpdateWorkSkillInput {
};
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], CreateUpdateWorkSkillInput.prototype, "skill", void 0);
__decorate([
    type_graphql_1.Field({ nullable: true }),
    __metadata("design:type", Number)
], CreateUpdateWorkSkillInput.prototype, "yearOfExperience", void 0);
CreateUpdateWorkSkillInput = __decorate([
    type_graphql_1.InputType({ isAbstract: true })
], CreateUpdateWorkSkillInput);
let CreateWorkSkillInput = class CreateWorkSkillInput extends CreateUpdateWorkSkillInput {
};
CreateWorkSkillInput = __decorate([
    type_graphql_1.InputType()
], CreateWorkSkillInput);
let UpdateWorkSkillInput = class UpdateWorkSkillInput extends CreateUpdateWorkSkillInput {
};
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", Number)
], UpdateWorkSkillInput.prototype, "id", void 0);
UpdateWorkSkillInput = __decorate([
    type_graphql_1.InputType()
], UpdateWorkSkillInput);
let CreateWorkSkillArgs = class CreateWorkSkillArgs {
};
__decorate([
    type_graphql_1.Field(() => CreateWorkSkillInput),
    __metadata("design:type", CreateWorkSkillInput)
], CreateWorkSkillArgs.prototype, "workSkill", void 0);
CreateWorkSkillArgs = __decorate([
    type_graphql_1.ArgsType()
], CreateWorkSkillArgs);
exports.CreateWorkSkillArgs = CreateWorkSkillArgs;
let UpdateWorkSkillArgs = class UpdateWorkSkillArgs {
};
__decorate([
    type_graphql_1.Field(() => CreateWorkSkillInput),
    __metadata("design:type", UpdateWorkSkillInput)
], UpdateWorkSkillArgs.prototype, "workSkill", void 0);
UpdateWorkSkillArgs = __decorate([
    type_graphql_1.ArgsType()
], UpdateWorkSkillArgs);
exports.UpdateWorkSkillArgs = UpdateWorkSkillArgs;
let DeleteWorkSkillArgs = class DeleteWorkSkillArgs {
};
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", Number)
], DeleteWorkSkillArgs.prototype, "id", void 0);
DeleteWorkSkillArgs = __decorate([
    type_graphql_1.ArgsType()
], DeleteWorkSkillArgs);
exports.DeleteWorkSkillArgs = DeleteWorkSkillArgs;
//# sourceMappingURL=workskill.type.js.map