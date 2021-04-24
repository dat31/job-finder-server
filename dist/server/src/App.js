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
const express_1 = __importDefault(require("express"));
const express_session_1 = __importDefault(require("express-session"));
const configs_1 = require("./configs");
const apollo_server_express_1 = require("apollo-server-express");
const typeorm_1 = require("typeorm");
const constants_1 = require("./constants");
const cors_1 = __importDefault(require("cors"));
const connectionConfig_1 = require("./configs/connectionConfig");
class App {
    constructor() {
        this.express = express_1.default();
    }
    listen(port) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.setupApp();
            this.express.listen(port);
        });
    }
    setupApp() {
        return __awaiter(this, void 0, void 0, function* () {
            if (constants_1.IS_PRODUCTION) {
                console.log("RUNNING IN PRODUCT ENV OKAY");
                console.log("CONFIG", configs_1.connectionConfig);
                this.express.set('trust proxy', 1);
                yield connectionConfig_1.pool.connect();
            }
            const conn = yield typeorm_1.createConnection(configs_1.connectionConfig);
            yield conn.runMigrations();
            this.express.use(express_session_1.default(configs_1.sessionConfig));
            this.express.use(cors_1.default({
                origin: process.env.CORS_ORIGIN,
                credentials: true,
            }));
            const apolloServer = new apollo_server_express_1.ApolloServer(yield configs_1.getApolloServerConfig());
            apolloServer.applyMiddleware({ app: this.express, cors: false });
        });
    }
}
exports.default = new App();
//# sourceMappingURL=App.js.map