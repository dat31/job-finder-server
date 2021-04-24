"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const hello_1 = __importDefault(require("./hello"));
const user_1 = __importDefault(require("./user"));
const post_1 = __importDefault(require("./post"));
const job_1 = __importDefault(require("./job"));
const workexperience_1 = __importDefault(require("./workexperience"));
const company_1 = __importDefault(require("./company"));
const workskill_1 = __importDefault(require("./workskill"));
const resolvers = [
    hello_1.default,
    user_1.default,
    post_1.default,
    job_1.default,
    company_1.default,
    workexperience_1.default,
    workskill_1.default
];
exports.default = resolvers;
//# sourceMappingURL=index.js.map