import { MiddlewareFn } from "type-graphql";
import { Context } from "../types";

const AUTH_ERR_MSG = "404"
const authMiddleware: MiddlewareFn<Context> = ( { context }, next ) => {
    if( !context.req.session.userId ) {
        throw new Error( AUTH_ERR_MSG )
    }
    return next()
}

export default authMiddleware
