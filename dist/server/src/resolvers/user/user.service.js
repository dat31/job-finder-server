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
var UserService_1;
Object.defineProperty(exports, "__esModule", { value: true });
const typedi_1 = require("typedi");
const base_1 = require("../../base");
const redisConfig_1 = require("../../configs/redisConfig");
const stringUtils_1 = require("../../utils/stringUtils");
const constants_1 = require("../../constants");
const argon2_1 = __importDefault(require("argon2"));
const user_helper_1 = require("./user.helper");
const uuid_1 = require("uuid");
const sendEmail_1 = __importDefault(require("../../api/sendEmail"));
let UserService = UserService_1 = class UserService extends base_1.BaseService {
    constructor(repositories) {
        super(repositories[0]);
        this.repositories = repositories;
        this.PW_MIN_LENGTH = 6;
        this.DB_DUPLICATE_ERR_CODE = '23505';
        const [userRepository, workExpRepository, workSkillRepository, jobRepository] = repositories;
        this.userRepository = userRepository;
        this.workExpRepository = workExpRepository;
        this.workSkillRepository = workSkillRepository;
        this.jobRepository = jobRepository;
        this.redis = redisConfig_1.redis;
    }
    getCurrentUser(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!userId)
                return undefined;
            return this.userRepository.findOne(userId);
        });
    }
    getProfile(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!userId)
                return undefined;
            return {
                workExperiences: yield this.workExpRepository.find({ userId }),
                workSkills: yield this.workSkillRepository.find({ userId })
            };
        });
    }
    changePassword({ token, newPassword }, onSuccess) {
        return __awaiter(this, void 0, void 0, function* () {
            if (stringUtils_1.isValidLength(newPassword, this.PW_MIN_LENGTH)) {
                return this.getError('newPassword', 'New password length must be greater than ' + this.PW_MIN_LENGTH);
            }
            try {
                const userId = yield this.redis.get(constants_1.FORGET_PASSWORD_PREFIX + token);
                if (!userId) {
                    return this.getError('token', 'Token expired');
                }
                const userIdInt = parseInt(userId);
                const user = yield this.userRepository.findOne(userIdInt);
                if (!user) {
                    return this.getError('token', 'User does not exists');
                }
                yield this.userRepository.update(userIdInt, { password: yield argon2_1.default.hash(newPassword) });
                yield this.redis.del(constants_1.FORGET_PASSWORD_PREFIX + token);
                onSuccess(userIdInt);
                return { user };
            }
            catch (e) {
                console.log('-----CHANGE PW ERROR------', e);
                return this.getError('token', 'An error occurred, try again later');
            }
        });
    }
    register(registerReq, onSuccess) {
        return __awaiter(this, void 0, void 0, function* () {
            let user;
            const { username, password, email } = registerReq;
            const errors = user_helper_1.validateRegister(registerReq);
            if (errors) {
                return { errors };
            }
            try {
                const result = yield this.userRepository
                    .create({ username, password: yield argon2_1.default.hash(password), email })
                    .save();
                user = result;
                onSuccess(result.id);
            }
            catch (e) {
                if (e.code === this.DB_DUPLICATE_ERR_CODE) {
                    return this.getError('username', "username or email already existed");
                }
                return this.getError('form', "An error occurred! Try again later");
            }
            return { user };
        });
    }
    login({ usernameOrEmail, password }, onSuccess) {
        return __awaiter(this, void 0, void 0, function* () {
            const column = usernameOrEmail.includes('@') ? 'email' : 'username';
            const user = yield this.userRepository.findOne({
                where: { [column]: usernameOrEmail }
            });
            if (!user) {
                return this.getError('usernameOrEmail', 'account does not exist!');
            }
            const valid = yield argon2_1.default.verify(user.password, password);
            if (!valid) {
                return this.getError('password', 'incorrect password');
            }
            onSuccess(user.id);
            return { user };
        });
    }
    forgotPassword(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userRepository.findOne({ where: { email } });
            if (!user) {
                return false;
            }
            const token = uuid_1.v4();
            yield this.redis.set(constants_1.FORGET_PASSWORD_PREFIX + token, user.id, 'ex', 1000 * 60 * 60 * 24 * 3);
            const html = `<a href="${process.env.CORS_ORIGIN}/change-password/${token}">reset password</a>`;
            const hehe = yield sendEmail_1.default(email, html);
            console.log('HEE', hehe);
            return true;
        });
    }
    notInterestedJob(userId, jobId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.updateJobIdColumn(userId, jobId, "notInterestedJobIds");
        });
    }
    saveJob(userId, jobId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.updateJobIdColumn(userId, jobId, "savedJobIds");
        });
    }
    getAllCurrentUserJobs(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userRepository.findOne(userId);
            if (!user) {
                return { savedJobs: [], appliedJobs: [] };
            }
            const { savedJobIds } = user;
            if (!savedJobIds) {
                return { savedJobs: [], appliedJobs: [] };
            }
            const savedJobs = yield this.jobRepository.findByIds(savedJobIds);
            return { savedJobs, appliedJobs: [] };
        });
    }
    getError(field, message) {
        return {
            errors: [{ field, message }]
        };
    }
    updateJobIdColumn(userId, jobId, jobColumn) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!userId) {
                return false;
            }
            const user = yield this.userRepository.findOne(userId);
            if (!user) {
                return false;
            }
            yield this.userRepository.update(userId, {
                [jobColumn]: [...user.savedJobIds, jobId]
            });
            return true;
        });
    }
};
UserService.DI_KEY = "USER_SERVICE";
UserService = UserService_1 = __decorate([
    typedi_1.Service(),
    __param(0, typedi_1.Inject(UserService_1.DI_KEY.toString())),
    __metadata("design:paramtypes", [Array])
], UserService);
exports.default = UserService;
//# sourceMappingURL=user.service.js.map