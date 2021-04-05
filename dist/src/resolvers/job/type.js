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
exports.JobArgs = exports.JobInput = exports.JobResponse = void 0;
const type_graphql_1 = require("type-graphql");
const entities_1 = require("../../entities");
let JobResponse = class JobResponse {
};
__decorate([
    type_graphql_1.Field(() => [entities_1.Job]),
    __metadata("design:type", Array)
], JobResponse.prototype, "jobs", void 0);
JobResponse = __decorate([
    type_graphql_1.ObjectType()
], JobResponse);
exports.JobResponse = JobResponse;
let JobInput = class JobInput extends entities_1.Job {
};
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], JobInput.prototype, "asd", void 0);
JobInput = __decorate([
    type_graphql_1.InputType()
], JobInput);
exports.JobInput = JobInput;
let JobArgs = class JobArgs {
};
__decorate([
    type_graphql_1.Field(() => JobInput),
    __metadata("design:type", JobInput)
], JobArgs.prototype, "jobInput", void 0);
JobArgs = __decorate([
    type_graphql_1.ArgsType()
], JobArgs);
exports.JobArgs = JobArgs;
//# sourceMappingURL=type.js.map