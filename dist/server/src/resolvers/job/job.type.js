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
exports.UpdateJobArgs = exports.CreateJobArgs = exports.UpdateJobInput = exports.CreateJobInput = exports.CategoriesResponse = exports.ReportJobResponse = exports.JobResponse = void 0;
const type_graphql_1 = require("type-graphql");
const entities_1 = require("../../entities");
const base_1 = require("../../base");
const Job_1 = require("../../entities/Job");
let JobResponse = class JobResponse extends base_1.PaginatedResponse(entities_1.Job) {
};
JobResponse = __decorate([
    type_graphql_1.ObjectType()
], JobResponse);
exports.JobResponse = JobResponse;
let ReportJobResponse = class ReportJobResponse {
};
__decorate([
    type_graphql_1.Field(() => entities_1.Job),
    __metadata("design:type", Object)
], ReportJobResponse.prototype, "jobToReplace", void 0);
__decorate([
    type_graphql_1.Field(() => type_graphql_1.Int),
    __metadata("design:type", Object)
], ReportJobResponse.prototype, "reportedJobId", void 0);
ReportJobResponse = __decorate([
    type_graphql_1.ObjectType()
], ReportJobResponse);
exports.ReportJobResponse = ReportJobResponse;
let CategoriesResponse = class CategoriesResponse {
};
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], CategoriesResponse.prototype, "title", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], CategoriesResponse.prototype, "numberOfJobs", void 0);
CategoriesResponse = __decorate([
    type_graphql_1.ObjectType()
], CategoriesResponse);
exports.CategoriesResponse = CategoriesResponse;
let BaseJobInput = class BaseJobInput {
};
__decorate([
    type_graphql_1.Field(() => String),
    __metadata("design:type", String)
], BaseJobInput.prototype, "title", void 0);
__decorate([
    type_graphql_1.Field(() => String, { nullable: true }),
    __metadata("design:type", String)
], BaseJobInput.prototype, "description", void 0);
__decorate([
    type_graphql_1.Field({ nullable: true }),
    __metadata("design:type", String)
], BaseJobInput.prototype, "employmentType", void 0);
__decorate([
    type_graphql_1.Field(() => [type_graphql_1.Int], { nullable: true }),
    __metadata("design:type", Array)
], BaseJobInput.prototype, "salary", void 0);
__decorate([
    type_graphql_1.Field(() => String, { nullable: true }),
    __metadata("design:type", String)
], BaseJobInput.prototype, "applicationDeadline", void 0);
__decorate([
    type_graphql_1.Field(() => type_graphql_1.Int, { nullable: true }),
    __metadata("design:type", Number)
], BaseJobInput.prototype, "experience", void 0);
BaseJobInput = __decorate([
    type_graphql_1.InputType()
], BaseJobInput);
let CreateJobInput = class CreateJobInput extends BaseJobInput {
};
__decorate([
    type_graphql_1.Field(() => type_graphql_1.Int),
    __metadata("design:type", Object)
], CreateJobInput.prototype, "companyId", void 0);
CreateJobInput = __decorate([
    type_graphql_1.InputType()
], CreateJobInput);
exports.CreateJobInput = CreateJobInput;
let UpdateJobInput = class UpdateJobInput extends BaseJobInput {
};
__decorate([
    type_graphql_1.Field(() => type_graphql_1.Int),
    __metadata("design:type", Object)
], UpdateJobInput.prototype, "id", void 0);
UpdateJobInput = __decorate([
    type_graphql_1.InputType()
], UpdateJobInput);
exports.UpdateJobInput = UpdateJobInput;
let CreateJobArgs = class CreateJobArgs {
};
__decorate([
    type_graphql_1.Field(() => CreateJobInput),
    __metadata("design:type", CreateJobInput)
], CreateJobArgs.prototype, "createJobInput", void 0);
CreateJobArgs = __decorate([
    type_graphql_1.ArgsType()
], CreateJobArgs);
exports.CreateJobArgs = CreateJobArgs;
let UpdateJobArgs = class UpdateJobArgs {
};
__decorate([
    type_graphql_1.Field(() => UpdateJobInput),
    __metadata("design:type", UpdateJobInput)
], UpdateJobArgs.prototype, "updateJobInput", void 0);
UpdateJobArgs = __decorate([
    type_graphql_1.ArgsType()
], UpdateJobArgs);
exports.UpdateJobArgs = UpdateJobArgs;
//# sourceMappingURL=job.type.js.map