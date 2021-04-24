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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const typedi_1 = require("typedi");
const typeorm_1 = require("typeorm");
let BaseService = class BaseService {
    constructor(repository) {
        this.repository = repository;
    }
    getAll(options) {
        return __awaiter(this, void 0, void 0, function* () {
            const [items, total] = yield this.repository.findAndCount(options);
            return {
                items,
                total,
                hasMore: true
            };
        });
    }
    getRepository() {
        return this.repository;
    }
    getById(id) {
        return this.repository.findOne(id);
    }
    create(entity) {
        return this.repository.create(entity).save();
    }
    update(criteria, partialEntity) {
        return this.repository
            .update(criteria, partialEntity)
            .then(() => partialEntity);
    }
    updateBasedOnPrevious(id, updateFn) {
        return __awaiter(this, void 0, void 0, function* () {
            const value = yield this.repository.findOne(id);
            if (value) {
                return this.repository.update(id, updateFn(value));
            }
            return Promise.reject();
        });
    }
    delete(criteria) {
        return this.repository
            .delete(criteria)
            .then(() => criteria.id
            ? criteria.id
            : criteria);
    }
};
BaseService = __decorate([
    typedi_1.Service(),
    __metadata("design:paramtypes", [typeorm_1.Repository])
], BaseService);
exports.default = BaseService;
//# sourceMappingURL=BaseService.js.map