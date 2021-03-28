import { MiddlewareFn } from "type-graphql";
import { Context } from "../types";

const authMiddleware: MiddlewareFn<Context> = ( { context }, next ) => {
    if ( !context.req.session.userId ) {
        throw new Error( '404' )
    }
    return next()
}

export default authMiddleware
