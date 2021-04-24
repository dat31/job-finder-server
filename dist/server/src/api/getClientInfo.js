"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getClientInfo = void 0;
const axios_1 = __importDefault(require("axios"));
const GEO_PLUGIN_URL = "http://www.geoplugin.net/json.gp";
function getClientInfo() {
    return axios_1.default.get(GEO_PLUGIN_URL);
}
exports.getClientInfo = getClientInfo;
//# sourceMappingURL=getClientInfo.js.map