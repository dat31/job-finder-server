import Redis from "ioredis";
import connect from "connect-redis";
import session from "express-session";
import { IS_PRODUCTION } from "../constants";
import IORedis from "ioredis";

console.log( process.env.REDIS_URL )
export const redis = new Redis(
    IS_PRODUCTION
        ? {
            host: [ { host: process.env.REDIS_URL } ],
            password: process.env.REDIS_PASSWORD,
            name: process.env.REDIS_PASSWORD
        } as any
        : process.env.REDIS_URL
)
export const RedisStore = connect( session )
export const sessionStore = new RedisStore( {
    client: redis,
    disableTouch: true,
} )
