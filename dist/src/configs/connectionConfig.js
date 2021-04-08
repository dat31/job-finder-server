"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("../constants");
const entities_1 = require("../entities");
const connectionConfig = Object.assign(Object.assign({ type: 'postgres' }, constants_1.IS_PRODUCTION
    ? {
        url: process.env.DATABASE_URL,
        ssl: {
            rejectUnauthorized: false
        },
    }
    : { database: 'lireddit2' }), { username: 'postgres', password: '123', logging: true, synchronize: true, entities: [entities_1.Post, entities_1.Job, entities_1.Company, entities_1.Updoot, entities_1.User, entities_1.CompanyReview] });
exports.default = connectionConfig;
//# sourceMappingURL=connectionConfig.js.map