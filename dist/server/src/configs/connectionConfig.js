"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pool = void 0;
const constants_1 = require("../constants");
const entities_1 = require("../entities");
const subscribers_1 = require("../subscribers");
const _1618583235867_DummyCompanies_1 = require("../migrations/1618583235867-DummyCompanies");
const _1620052686114_DummyCompanyReviews_1 = require("../migrations/1620052686114-DummyCompanyReviews");
const _1620045765611_DummyJob_1 = require("../migrations/1620045765611-DummyJob");
const pg_1 = require("pg");
exports.pool = new pg_1.Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: true,
    port: 5432,
    password: process.env.PG_PASSWORD,
    user: process.env.PG_USERNAME,
});
const config = constants_1.IS_PRODUCTION
    ? { url: process.env.DATABASE_URL }
    : { database: 'job-finder' };
const connectionConfig = Object.assign(Object.assign({}, config), { type: 'postgres', port: 5432, username: process.env.PG_USERNAME, password: process.env.PG_PASSWORD, logging: true, synchronize: true, entities: [
        entities_1.Job,
        entities_1.Company,
        entities_1.User,
        entities_1.CompanyReview,
        entities_1.WorkExperience,
        entities_1.WorkSkill
    ], subscribers: [subscribers_1.JobSubscriber], migrations: [
        _1618583235867_DummyCompanies_1.DummyCompanies1618583235867,
        _1620052686114_DummyCompanyReviews_1.DummyCompanyReviews1620052686114,
        _1620045765611_DummyJob_1.DummyJob1620045765611
    ] });
exports.default = connectionConfig;
//# sourceMappingURL=connectionConfig.js.map