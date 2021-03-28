"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sessionStore = exports.RedisStore = exports.redis = void 0;
const ioredis_1 = __importDefault(require("ioredis"));
const connect_redis_1 = __importDefault(require("connect-redis"));
const express_session_1 = __importDefault(require("express-session"));
exports.redis = new ioredis_1.default(process.env.REDIS_URL);
exports.RedisStore = connect_redis_1.default(express_session_1.default);
exports.sessionStore = new exports.RedisStore({
    client: exports.redis,
    disableTouch: true,
});
//# sourceMappingURL=redisConfig.js.map