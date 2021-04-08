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
const type_graphql_1 = require("type-graphql");
const resolvers_1 = __importDefault(require("../resolvers"));
const redisConfig_1 = require("./redisConfig");
const typedi_1 = require("typedi");
const company_service_1 = __importDefault(require("../resolvers/company/company.service"));
const typeorm_1 = require("typeorm");
const entities_1 = require("../entities");
const job_service_1 = __importDefault(require("../resolvers/job/job.service"));
const user_service_1 = __importDefault(require("../resolvers/user/user.service"));
const authChecker_1 = __importDefault(require("../authChecker"));
function inject(EntityClass, id) {
    typedi_1.Container.set({
        id,
        factory: () => typeorm_1.getRepository(EntityClass)
    });
}
inject(entities_1.Company, company_service_1.default.DI_KEY.toString());
inject(entities_1.Job, job_service_1.default.DI_KEY.toString());
inject(entities_1.User, user_service_1.default.DI_KEY.toString());
function getApolloServerConfig() {
    return __awaiter(this, void 0, void 0, function* () {
        return ({
            schema: yield type_graphql_1.buildSchema({
                resolvers: resolvers_1.default,
                validate: false,
                container: typedi_1.Container,
                authChecker: authChecker_1.default,
                authMode: "error",
            }),
            context: ({ req, res }) => ({
                req,
                res,
                redis: redisConfig_1.redis,
            })
        });
    });
}
exports.default = getApolloServerConfig;
//# sourceMappingURL=apolloServerConfig.js.map