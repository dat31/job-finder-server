"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FORGET_PASSWORD_PREFIX = exports.COOKIE_NAME = exports.IS_PRODUCTION = void 0;
const package_json_1 = require("../package.json");
exports.IS_PRODUCTION = process.env.NODE_ENV === 'production';
exports.COOKIE_NAME = package_json_1.name + '_id';
exports.FORGET_PASSWORD_PREFIX = 'forget-password:';
//# sourceMappingURL=constants.js.map