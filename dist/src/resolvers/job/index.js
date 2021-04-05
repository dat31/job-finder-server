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
let JobResolver = class JobResolver {
    constructor(jobService) {
        this.jobService = jobService;
    }
    getAllJobs() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.jobService.getAllJobs();
        });
    }
    createJob({ jobInput }) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.jobService.createJob(jobInput);
        });
    }
};
__decorate([
    type_graphql_1.Query(() => job_type_1.JobResponse),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], JobResolver.prototype, "getAllJobs", null);
__decorate([
    type_graphql_1.Mutation(() => entities_1.Job),
    __param(0, type_graphql_1.Args()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [job_type_1.JobArgs]),
    __metadata("design:returntype", Promise)
], JobResolver.prototype, "createJob", null);
JobResolver = __decorate([
    typedi_1.Service(),
    type_graphql_1.Resolver(entities_1.Job),
    __metadata("design:paramtypes", [job_service_1.default])
], JobResolver);
exports.default = JobResolver;
//# sourceMappingURL=index.js.map