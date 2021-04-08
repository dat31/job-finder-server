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
const typeorm_1 = require("typeorm");
const user_service_1 = __importDefault(require("../user/user.service"));
const LIMIT_DISPLAY_JOBS = 6;
const ALREADY_DISPLAYED_JOB_IDS = "ALREADY_DISPLAYED_JOB_IDS";
let JobResolver = class JobResolver {
    constructor(userService, jobService) {
        this.userService = userService;
        this.jobService = jobService;
    }
    company(job) {
        return loader_1.companyLoader.load(job.companyId);
    }
    salary(job) {
        const { salary } = job || {};
        if (Array.isArray(salary) && salary.length > 0) {
            return salary.length === 2
                ? `${salary[0]} - ${salary[1]}`
                : `Upto ${salary[0]}`;
        }
        return "Offer";
    }
    createJob({ createJobInput }) {
        return this.jobService.create(createJobInput);
    }
    updateJob({ updateJobInput }) {
        return this.jobService.update(updateJobInput.id, updateJobInput);
    }
    reportJob(ctx, jobId) {
        return __awaiter(this, void 0, void 0, function* () {
            const alreadyDisplayedJobIds = yield this.getHasDisplayedJobIds(ctx.redis);
            const notInIds = (alreadyDisplayedJobIds ? alreadyDisplayedJobIds : []).concat([jobId]);
            const jobToReplace = yield this.jobService.findOne({
                id: typeorm_1.Not(typeorm_1.In(notInIds))
            });
            return {
                jobToReplace,
                reportedJobId: jobId
            };
        });
    }
    jobs(ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.jobService.getAll(yield this.getFindCondition(ctx));
        });
    }
    hottestJob(ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.jobService.getAll(yield this.getFindCondition(ctx, { viewCount: "DESC" }));
        });
    }
    newestJob(ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.jobService.getAll(yield this.getFindCondition(ctx, { createdAt: "DESC" }));
        });
    }
    relatedJobs(ctx, currentJobId, companyId, jobCategory) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.jobService.getAll(yield this.getFindCondition(ctx, undefined, undefined, {
                title: typeorm_1.Like(jobCategory),
                companyId: typeorm_1.Equal(companyId),
                id: typeorm_1.Not(typeorm_1.Equal(currentJobId))
            }));
        });
    }
    deleteJob(id) {
        return this.jobService.delete(id);
    }
    job(id) {
        return this.jobService.getById(id);
    }
    getFindCondition(ctx, order, take = LIMIT_DISPLAY_JOBS, where = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userService.getById(ctx === null || ctx === void 0 ? void 0 : ctx.req.session.userId);
            const { notInterestedJobIds = [] } = user || {};
            if (!notInterestedJobIds || notInterestedJobIds.length <= 0) {
                return ({ order, take });
            }
            return ({
                order,
                take,
                where: Object.assign({ id: typeorm_1.Not(typeorm_1.In(notInterestedJobIds)) }, where)
            });
        });
    }
    parseJson(json) {
        if (json) {
            return JSON.parse(json);
        }
        return null;
    }
    setHasDisplayedJobIds(redis, value) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield redis.set(ALREADY_DISPLAYED_JOB_IDS, JSON.stringify(value));
            }
            catch (_) {
                return Promise.resolve();
            }
        });
    }
    getHasDisplayedJobIds(redis) {
        return __awaiter(this, void 0, void 0, function* () {
            const hasDisplayedJobIds = yield redis.get(ALREADY_DISPLAYED_JOB_IDS);
            return this.parseJson(hasDisplayedJobIds);
        });
    }
};
__decorate([
    type_graphql_1.FieldResolver(() => entities_1.Company),
    __param(0, type_graphql_1.Root()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [entities_1.Job]),
    __metadata("design:returntype", void 0)
], JobResolver.prototype, "company", null);
__decorate([
    type_graphql_1.FieldResolver(() => String, { nullable: true }),
    __param(0, type_graphql_1.Root()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [entities_1.Job]),
    __metadata("design:returntype", void 0)
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
    type_graphql_1.Query(() => job_type_1.JobResponse),
    __param(0, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], JobResolver.prototype, "hottestJob", null);
__decorate([
    type_graphql_1.Query(() => job_type_1.JobResponse),
    __param(0, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], JobResolver.prototype, "newestJob", null);
__decorate([
    type_graphql_1.Query(() => job_type_1.JobResponse),
    __param(0, type_graphql_1.Ctx()),
    __param(1, type_graphql_1.Arg("currentJobId", () => type_graphql_1.Int)),
    __param(2, type_graphql_1.Arg("companyId", () => type_graphql_1.Int)),
    __param(3, type_graphql_1.Arg("jobCategory", () => String)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Number, String]),
    __metadata("design:returntype", Promise)
], JobResolver.prototype, "relatedJobs", null);
__decorate([
    type_graphql_1.Authorized("ADMIN"),
    type_graphql_1.Mutation(() => job_type_1.DeleteJobResponse),
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