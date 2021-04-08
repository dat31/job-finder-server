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
const path_1 = __importDefault(require("path"));
require('dotenv').config();
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
const apollo_server_express_1 = require("apollo-server-express");
const express_session_1 = __importDefault(require("express-session"));
const cors_1 = __importDefault(require("cors"));
const typeorm_1 = require("typeorm");
const configs_1 = require("./configs");
(function () {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const port = parseInt(process.env.PORT);
            const conn = yield typeorm_1.createConnection(Object.assign(Object.assign({}, configs_1.connectionConfig), { migrations: [path_1.default.join(__dirname, "./migrations/*")] }));
            const app = express_1.default();
            app.use(cors_1.default({
                origin: process.env.CORS_ORIGIN,
                credentials: true,
            }));
            app.set('trust proxy', 1);
            app.use(express_session_1.default(configs_1.sessionConfig));
            const apolloServer = new apollo_server_express_1.ApolloServer(yield configs_1.getApolloServerConfig());
            apolloServer.applyMiddleware({ app, cors: false });
            app.listen(port);
        }
        catch (e) {
            console.log('------APP ERROR------', e);
        }
    });
})();
function handleUnCaughtException(error) {
    console.log('-----UN_CAUGHT_EXCEPTION-----', error);
}
process.on('uncaughtException', handleUnCaughtException);
//# sourceMappingURL=index.js.map