"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dataloader_1 = __importDefault(require("dataloader"));
const batchLoadFn = (keys) => {
};
const createVoteStatusLoader = () => new dataloader_1.default(batchLoadFn);
exports.default = createVoteStatusLoader;
//# sourceMappingURL=createVoteStatusLoader.js.map