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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const type_graphql_1 = require("type-graphql");
const entities_1 = require("../../entities");
const job_type_1 = require("./job.type");
const job_service_1 = __importDefault(require("./job.service"));
const typedi_1 = require("typedi");
const loader_1 = require("../../loader");
const user_service_1 = __importDefault(require("../user/user.service"));
let JobResolver = class JobResolver {
    constructor(userService, jobService) {
        this.userService = userService;
        this.jobService = jobService;
    }
    company(job) {
        return loader_1.companyLoader.load(job.companyId);
    }
    hasBeenSaved(job, ctx) {
        return loader_1.createJobSaveStatusLoader(ctx.req.session.userId).load(job.id);
    }
    hasBeenReported(job) {
        return false;
    }
    salary(job) {
        return this.jobService.getSalary(job === null || job === void 0 ? void 0 : job.salary);
    }
    createJob({ createJobInput }) {
        return this.jobService.create(createJobInput);
    }
    updateJob({ updateJobInput }) {
        return this.jobService.update(updateJobInput.id, updateJobInput);
    }
    saveJob(ctx, jobId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.jobService.saveJob(ctx.req.session.userId, jobId);
        });
    }
    reportJob(ctx, jobId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.jobService.reportJob(ctx.req.session.userId, jobId);
        });
    }
    jobs(ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.jobService.getAllJobs(ctx.req.session.userId);
        });
    }
    hottestJob(ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("HOTTEST JOB RESOLVER", ctx.req.session.userId);
            return this.jobService.getHottestJobs(ctx.req.session.userId);
        });
    }
    newestJob(ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.jobService.getNewestJobs(ctx.req.session.userId);
        });
    }
    relatedJobs(ctx, currentJobId, companyId, jobCategory) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.jobService.getRelatedJobs(ctx.req.session.userId, jobCategory, currentJobId);
        });
    }
    hottestCategories() {
        return this.jobService.getHottestCategories();
    }
    deleteJob(id) {
        return this.jobService.delete(id);
    }
    job(id) {
        return this.jobService.getById(id);
    }
};
__decorate([
    type_graphql_1.FieldResolver(() => entities_1.Company),
    __param(0, type_graphql_1.Root()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [entities_1.Job]),
    __metadata("design:returntype", Promise)
], JobResolver.prototype, "company", null);
__decorate([
    type_graphql_1.FieldResolver(() => Boolean),
    __param(0, type_graphql_1.Root()), __param(1, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [entities_1.Job, Object]),
    __metadata("design:returntype", Promise)
], JobResolver.prototype, "hasBeenSaved", null);
__decorate([
    type_graphql_1.FieldResolver(() => Boolean),
    __param(0, type_graphql_1.Root()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [entities_1.Job]),
    __metadata("design:returntype", void 0)
], JobResolver.prototype, "hasBeenReported", null);
__decorate([
    type_graphql_1.FieldResolver(() => String, { nullable: true }),
    __param(0, type_graphql_1.Root()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [entities_1.Job]),
    __metadata("design:returntype", String)
], JobResolver.prototype, "salary", null);
__decorate([
    type_graphql_1.Mutation(() => entities_1.Job),
    __param(0, type_graphql_1.Args()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [job_type_1.CreateJobArgs]),
    __metadata("design:returntype", void 0)
], JobResolver.prototype, "createJob", null);
__decorate([
    type_graphql_1.Mutation(() => entities_1.Job),
    __param(0, type_graphql_1.Args()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [job_type_1.UpdateJobArgs]),
    __metadata("design:returntype", void 0)
], JobResolver.prototype, "updateJob", null);
__decorate([
    type_graphql_1.Authorized(),
    type_graphql_1.Mutation(() => type_graphql_1.Int, { nullable: true }),
    __param(0, type_graphql_1.Ctx()),
    __param(1, type_graphql_1.Arg("jobId", () => type_graphql_1.Int)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", Promise)
], JobResolver.prototype, "saveJob", null);
__decorate([
    type_graphql_1.Authorized(),
    type_graphql_1.Mutation(() => job_type_1.ReportJobResponse, { nullable: true }),
    __param(0, type_graphql_1.Ctx()),
    __param(1, type_graphql_1.Arg("jobId", () => type_graphql_1.Int)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", Promise)
], JobResolver.prototype, "reportJob", null);
__decorate([
    type_graphql_1.Query(() => job_type_1.JobResponse, { nullable: true }),
    __param(0, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], JobResolver.prototype, "jobs", null);
__decorate([
    type_graphql_1.Query(() => [entities_1.Job]),
    __param(0, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], JobResolver.prototype, "hottestJob", null);
__decorate([
    type_graphql_1.Query(() => [entities_1.Job]),
    __param(0, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], JobResolver.prototype, "newestJob", null);
__decorate([
    type_graphql_1.Query(() => [entities_1.Job]),
    __param(0, type_graphql_1.Ctx()),
    __param(1, type_graphql_1.Arg("currentJobId", () => type_graphql_1.Int)),
    __param(2, type_graphql_1.Arg("companyId", () => type_graphql_1.Int)),
    __param(3, type_graphql_1.Arg("jobCategory", () => String)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number, Number, String]),
    __metadata("design:returntype", Promise)
], JobResolver.prototype, "relatedJobs", null);
__decorate([
    type_graphql_1.Query(() => [job_type_1.CategoriesResponse]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], JobResolver.prototype, "hottestCategories", null);
__decorate([
    type_graphql_1.Authorized("ADMIN"),
    type_graphql_1.Mutation(() => type_graphql_1.Int),
    __param(0, type_graphql_1.Arg("id", () => type_graphql_1.Int)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], JobResolver.prototype, "deleteJob", null);
__decorate([
    type_graphql_1.Query(() => entities_1.Job, { nullable: true }),
    __param(0, type_graphql_1.Arg("id", () => type_graphql_1.Int)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], JobResolver.prototype, "job", null);
JobResolver = __decorate([
    typedi_1.Service(),
    type_graphql_1.Resolver(entities_1.Job),
    __metadata("design:paramtypes", [user_service_1.default,
        job_service_1.default])
], JobResolver);
exports.default = JobResolver;
//# sourceMappingURL=index.js.map