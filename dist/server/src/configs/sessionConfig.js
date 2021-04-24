"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("../constants");
const redisConfig_1 = require("./redisConfig");
const sessionConfig = {
    saveUninitialized: false,
    name: constants_1.COOKIE_NAME,
    store: redisConfig_1.sessionStore,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 365 * 10,
        httpOnly: true,
        sameSite: 'lax',
    },
    secret: process.env.SESSION_SECRET,
    resave: false
};
exports.default = sessionConfig;
//# sourceMappingURL=sessionConfig.js.map