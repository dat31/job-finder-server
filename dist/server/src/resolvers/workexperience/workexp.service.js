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
var WorkExperienceService_1;
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const typedi_1 = require("typedi");
const base_1 = require("../../base");
let WorkExperienceService = WorkExperienceService_1 = class WorkExperienceService extends base_1.BaseService {
    constructor(repository) {
        super(repository);
    }
};
WorkExperienceService.DI_KEY = "WORK_EXP_SERVICE";
WorkExperienceService = WorkExperienceService_1 = __decorate([
    typedi_1.Service(),
    __param(0, typedi_1.Inject(WorkExperienceService_1.DI_KEY.toString())),
    __metadata("design:paramtypes", [typeorm_1.Repository])
], WorkExperienceService);
exports.default = WorkExperienceService;
//# sourceMappingURL=workexp.service.js.map