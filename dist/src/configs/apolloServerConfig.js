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
Object.defineProperty(exports, "__esModule", { value: true });
const type_graphql_1 = require("type-graphql");
const resolvers_1 = require("../resolvers");
const loader_1 = require("../loader");
const redisConfig_1 = require("./redisConfig");
const getApolloServerConfig = () => __awaiter(void 0, void 0, void 0, function* () {
    return ({
        schema: yield type_graphql_1.buildSchema({
            resolvers: [
                resolvers_1.HelloResolver,
                resolvers_1.PostResolver,
                resolvers_1.UserResolver
            ],
            validate: false,
        }),
        context: ({ req, res }) => ({
            req,
            res,
            redis: redisConfig_1.redis,
            voteStatusLoader: loader_1.voteStatusLoader,
        })
    });
});
exports.default = getApolloServerConfig;
//# sourceMappingURL=apolloServerConfig.js.map