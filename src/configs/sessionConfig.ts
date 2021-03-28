import { COOKIE_NAME, IS_PRODUCTION } from "../constants";
import session, { SessionOptions } from "express-session";
import { sessionStore } from "./redisConfig";

const sessionConfig: SessionOptions = {
    saveUninitialized: false,
    name: COOKIE_NAME,
    store: sessionStore,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 365 * 10,
        httpOnly: true,
        sameSite: 'lax',
        secure: IS_PRODUCTION,
    },
    secret: process.env.SESSION_SECRET as string,
    resave: false
}

export default sessionConfig
