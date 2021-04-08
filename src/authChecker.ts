import { ResolverData } from "type-graphql";
import { Context } from "./types";

function authChecker( resolverData: ResolverData<Context>, roles: string[] ): boolean {

    console.log( {
        resolverData,
        roles
    } )

    if( roles.length === 0 ) {
        return typeof resolverData.context.req.session.userId === "number"
    }

    return false;
}

export default authChecker
