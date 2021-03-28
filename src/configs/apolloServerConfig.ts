import { buildSchema } from "type-graphql";
import { HelloResolver, PostResolver, UserResolver } from "../resolvers";
import { Context } from "../types";
import { voteStatusLoader } from "../loader";
import { redis } from "./redisConfig";

const getApolloServerConfig = async () => ( {
    schema: await buildSchema( {
        resolvers: [
            HelloResolver,
            PostResolver,
            UserResolver
        ],
        validate: false,
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
