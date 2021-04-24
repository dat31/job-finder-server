"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
const dataloader_1 = __importDefault(require("dataloader"));
const entities_1 = require("../entities");
const typeorm_1 = require("typeorm");
function createJobSaveStatusLoader(userId) {
    return new dataloader_1.default(function (keys) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield typeorm_1.getRepository(entities_1.User).findOne(userId);
            if (!user) {
                return keys.map(() => false);
            }
            const { savedJobIds } = user;
            if (!savedJobIds) {
                return keys.map(() => false);
            }
            return keys.map(k => savedJobIds.includes(k));
        });
    });
}
exports.default = createJobSaveStatusLoader;
//# sourceMappingURL=createJobSaveStatusLoader.js.map