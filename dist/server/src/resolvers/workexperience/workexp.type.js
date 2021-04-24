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
exports.DeleteWorkExpArgs = exports.UpdateWorkExpArgs = exports.CreateWorkExpArgs = void 0;
const type_graphql_1 = require("type-graphql");
let CreateUpdateWorkExpInput = class CreateUpdateWorkExpInput {
};
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], CreateUpdateWorkExpInput.prototype, "jobTitle", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], CreateUpdateWorkExpInput.prototype, "company", void 0);
__decorate([
    type_graphql_1.Field({ nullable: true }),
    __metadata("design:type", String)
], CreateUpdateWorkExpInput.prototype, "from", void 0);
__decorate([
    type_graphql_1.Field({ nullable: true }),
    __metadata("design:type", String)
], CreateUpdateWorkExpInput.prototype, "to", void 0);
CreateUpdateWorkExpInput = __decorate([
    type_graphql_1.InputType({ isAbstract: true })
], CreateUpdateWorkExpInput);
let CreateWorkExpInput = class CreateWorkExpInput extends CreateUpdateWorkExpInput {
};
CreateWorkExpInput = __decorate([
    type_graphql_1.InputType()
], CreateWorkExpInput);
let UpdateWorkExpInput = class UpdateWorkExpInput extends CreateUpdateWorkExpInput {
};
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", Number)
], UpdateWorkExpInput.prototype, "id", void 0);
UpdateWorkExpInput = __decorate([
    type_graphql_1.InputType()
], UpdateWorkExpInput);
let CreateWorkExpArgs = class CreateWorkExpArgs {
};
__decorate([
    type_graphql_1.Field(() => CreateWorkExpInput),
    __metadata("design:type", CreateWorkExpInput)
], CreateWorkExpArgs.prototype, "workExperience", void 0);
CreateWorkExpArgs = __decorate([
    type_graphql_1.ArgsType()
], CreateWorkExpArgs);
exports.CreateWorkExpArgs = CreateWorkExpArgs;
let UpdateWorkExpArgs = class UpdateWorkExpArgs {
};
__decorate([
    type_graphql_1.Field(() => UpdateWorkExpInput),
    __metadata("design:type", UpdateWorkExpInput)
], UpdateWorkExpArgs.prototype, "workExperience", void 0);
UpdateWorkExpArgs = __decorate([
    type_graphql_1.ArgsType()
], UpdateWorkExpArgs);
exports.UpdateWorkExpArgs = UpdateWorkExpArgs;
let DeleteWorkExpArgs = class DeleteWorkExpArgs {
};
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", Number)
], DeleteWorkExpArgs.prototype, "id", void 0);
DeleteWorkExpArgs = __decorate([
    type_graphql_1.ArgsType()
], DeleteWorkExpArgs);
exports.DeleteWorkExpArgs = DeleteWorkExpArgs;
//# sourceMappingURL=workexp.type.js.map