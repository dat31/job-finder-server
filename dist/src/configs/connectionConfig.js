"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("../constants");
const Post_1 = require("../entities/Post");
const User_1 = require("../entities/User");
const Updoot_1 = require("../entities/Updoot");
const path_1 = __importDefault(require("path"));
const connectionConfig = Object.assign(Object.assign({ type: 'postgres' }, constants_1.IS_PRODUCTION
    ? {
        url: process.env.DATABASE_URL,
        ssl: {
            rejectUnauthorized: false
        },
    }
    : { database: 'lireddit2' }), { username: 'postgres', password: '123', logging: true, synchronize: true, entities: [Post_1.Post, User_1.User, Updoot_1.Updoot], migrations: [path_1.default.join(__dirname, "./migrations/*")] });
exports.default = connectionConfig;
//# sourceMappingURL=connectionConfig.js.map