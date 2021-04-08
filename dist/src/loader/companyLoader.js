"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const entities_1 = require("../entities");
const createLoader_1 = __importDefault(require("./createLoader"));
const companyLoader = createLoader_1.default(entities_1.Company);
exports.default = companyLoader;
//# sourceMappingURL=companyLoader.js.map