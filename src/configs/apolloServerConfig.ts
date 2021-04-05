import { buildSchema } from "type-graphql";
import resolvers from "../resolvers";
import { Context } from "../types";
import { voteStatusLoader } from "../loader";
import { redis } from "./redisConfig";
import { Container } from "typedi";

const getApolloServerConfig = async () => ( {
    schema: await buildSchema( {
        resolvers,
        validate: false,
        container: Container
    } ),
    // @ts-ignore
    context: ( { req, res } ): Context => ( {
        req,
        res,
        redis,
        voteStatusLoader,
    } )
} )

export default getApolloServerConfig
