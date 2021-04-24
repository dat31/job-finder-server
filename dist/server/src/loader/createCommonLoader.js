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
const typeorm_1 = require("typeorm");
const dataloader_1 = __importDefault(require("dataloader"));
function createCommonLoader(TClass) {
    function batchLoadFn(keys) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield typeorm_1.getRepository(TClass).findByIds(keys);
            const map = new Map();
            for (const record of result) {
                map.set(record.id, record);
            }
            return keys.map((key) => map.get(key));
        });
    }
    return new dataloader_1.default(batchLoadFn);
}
exports.default = createCommonLoader;
//# sourceMappingURL=createCommonLoader.js.map