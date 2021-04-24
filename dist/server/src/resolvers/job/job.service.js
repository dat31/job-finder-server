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
var JobService_1;
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const typedi_1 = require("typedi");
const base_1 = require("../../base");
const redisConfig_1 = require("../../configs/redisConfig");
let JobService = JobService_1 = class JobService extends base_1.BaseService {
    constructor([jobRepo, userRepo]) {
        super(jobRepo);
        this.ALREADY_DISPLAYED_JOB_IDS = "ALREADY_DISPLAYED_JOB_IDS";
        this.LIMIT_DISPLAY_JOBS = 6;
        this.userRepository = userRepo;
        this.jobRepository = jobRepo;
        this.redis = redisConfig_1.redis;
    }
    getSalary(salaryRes) {
        if (!salaryRes) {
            return "Offer";
        }
        if (Array.isArray(salaryRes) && salaryRes.length > 0) {
            return salaryRes.length === 2
                ? `${salaryRes[0]} - ${salaryRes[1]}`
                : `Upto ${salaryRes[0]}`;
        }
        return "Offer";
    }
    saveJob(userId, jobId) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userRepository.findOne(userId);
            if (!user) {
                return null;
            }
            if (!user.savedJobIds) {
                yield this.userRepository.update(user.id, { savedJobIds: [jobId] });
                return jobId;
            }
            if (user.savedJobIds.some((savedJobId) => savedJobId === jobId)) {
                yield this.userRepository.update(user.id, {
                    savedJobIds: user.savedJobIds.filter(j => j !== jobId)
                });
                return jobId;
            }
            yield this.userRepository.update(user.id, { savedJobIds: [...user.savedJobIds, jobId] });
            return jobId;
        });
    }
    getHottestCategories() {
        return Promise.resolve([
            { title: "Development", numberOfJobs: "100+ jobs" },
            { title: "Design", numberOfJobs: "100+ jobs" },
            { title: "Security", numberOfJobs: "100+ jobs" },
            { title: "Development", numberOfJobs: "100+ jobs" },
            { title: "Design", numberOfJobs: "100+ jobs" },
            { title: "Security", numberOfJobs: "100+ jobs" },
        ]);
    }
    reportJob(userId, jobId) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!userId) {
                return Promise.reject();
            }
            const alreadyDisplayedJobIds = yield this.getAlreadyDisplayedJobIds();
            const user = yield this.userRepository.findOne(userId);
            if (!user) {
                return Promise.reject();
            }
            const notInIds = (alreadyDisplayedJobIds ? alreadyDisplayedJobIds : [])
                .concat([jobId])
                .concat((user === null || user === void 0 ? void 0 : user.reportedJobIds) ? user.reportedJobIds : []);
            const jobToReplace = yield this.jobRepository.findOne({
                id: typeorm_1.Not(typeorm_1.In(notInIds))
            });
            yield this.userRepository.update(userId, Object.assign(Object.assign({}, user), { reportedJobIds: user.reportedJobIds ? [...user.reportedJobIds, jobId] : [jobId] }));
            return {
                jobToReplace,
                reportedJobId: jobId
            };
        });
    }
    getHottestJobs(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("GET HOTTEST JOB", userId);
            return this.getNewestOrHottestJob(userId, { viewCount: "DESC" });
        });
    }
    getNewestJobs(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.getNewestOrHottestJob(userId, { createdAt: "DESC" });
        });
    }
    getRelatedJobs(userId, jobCategory, currentJobId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.jobRepository.find(yield this.getFindCondition(userId, undefined, undefined, { title: typeorm_1.Like(jobCategory) }, currentJobId));
        });
    }
    getAllJobs(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.getAll(yield this.getFindCondition(userId));
        });
    }
    getNewestOrHottestJob(userId, order) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.jobRepository.find(yield this.getFindCondition(userId, order));
            if (result) {
                yield this.setAlreadyDisplayedJobIds(result.map(job => job.id));
            }
            return result;
        });
    }
    getAlreadyDisplayedJobIds() {
        return __awaiter(this, void 0, void 0, function* () {
            const hasDisplayedJobIds = yield this.redis.get(this.ALREADY_DISPLAYED_JOB_IDS);
            return this.parseJson(hasDisplayedJobIds);
        });
    }
    setAlreadyDisplayedJobIds(jobIds) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const alreadyDisplayedJobIds = yield this.getAlreadyDisplayedJobIds();
                yield this.redis.set(this.ALREADY_DISPLAYED_JOB_IDS, JSON.stringify(Array.isArray(alreadyDisplayedJobIds)
                    ? Array.from(new Set(jobIds.concat(alreadyDisplayedJobIds)))
                    : jobIds));
            }
            catch (_) {
                return Promise.resolve();
            }
        });
    }
    parseJson(json) {
        if (json) {
            return JSON.parse(json);
        }
        return undefined;
    }
    getFindCondition(userId, order, take = this.LIMIT_DISPLAY_JOBS, where = {}, omitJobId) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log({ userId });
            if (!userId) {
                return ({ order, take });
            }
            const user = yield this.userRepository.findOne(userId);
            console.log("asd", user);
            if (!user) {
                return ({ order, take });
            }
            const { notInterestedJobIds = [], reportedJobIds = [] } = user || {};
            const notIn = (notInterestedJobIds ? notInterestedJobIds : [])
                .concat(reportedJobIds ? reportedJobIds : [])
                .concat(omitJobId ? omitJobId : []);
            console.log({ notIn, notInterestedJobIds });
            return ({
                order,
                take,
                where: Object.assign({ id: typeorm_1.Not(typeorm_1.In(notIn)) }, where)
            });
        });
    }
};
JobService.DI_KEY = "JOB_SERVICE";
JobService = JobService_1 = __decorate([
    typedi_1.Service(),
    __param(0, typedi_1.Inject(JobService_1.DI_KEY.toString())),
    __metadata("design:paramtypes", [Array])
], JobService);
exports.default = JobService;
//# sourceMappingURL=job.service.js.map