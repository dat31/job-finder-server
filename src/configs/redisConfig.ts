import Redis from "ioredis";
import connect from "connect-redis";
import session from "express-session";

export const redis = new Redis( process.env.REDIS_URL )
export const RedisStore = connect( session )
export const sessionStore = new RedisStore( {
    client: redis,
    disableTouch: true,
} )
