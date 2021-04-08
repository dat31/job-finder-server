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
exports.UserResponse = exports.ErrorField = exports.RegisterInput = void 0;
const type_graphql_1 = require("type-graphql");
const entities_1 = require("../../entities");
let RegisterInput = class RegisterInput {
};
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], RegisterInput.prototype, "username", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], RegisterInput.prototype, "password", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], RegisterInput.prototype, "email", void 0);
RegisterInput = __decorate([
    type_graphql_1.InputType()
], RegisterInput);
exports.RegisterInput = RegisterInput;
let ErrorField = class ErrorField {
};
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], ErrorField.prototype, "field", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], ErrorField.prototype, "message", void 0);
ErrorField = __decorate([
    type_graphql_1.ObjectType()
], ErrorField);
exports.ErrorField = ErrorField;
let UserResponse = class UserResponse {
};
__decorate([
    type_graphql_1.Field(() => [ErrorField], { nullable: true }),
    __metadata("design:type", Array)
], UserResponse.prototype, "errors", void 0);
__decorate([
    type_graphql_1.Field(() => entities_1.User, { nullable: true }),
    __metadata("design:type", entities_1.User)
], UserResponse.prototype, "user", void 0);
UserResponse = __decorate([
    type_graphql_1.ObjectType()
], UserResponse);
exports.UserResponse = UserResponse;
//# sourceMappingURL=user.type.js.map