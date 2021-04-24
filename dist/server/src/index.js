"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config({ path: `.env.${process.env.NODE_ENV || `development`}` });
require("reflect-metadata");
const App_1 = __importDefault(require("./App"));
const PORT = parseInt(process.env.PORT);
function handleAppError(error) {
    console.log('-----APP_ERROR-----', error);
}
App_1.default.listen(PORT).catch(handleAppError);
process.on('uncaughtException', handleAppError);
//# sourceMappingURL=index.js.map