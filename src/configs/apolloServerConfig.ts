import { buildSchema, ClassType } from "type-graphql";
import resolvers from "../resolvers";
import { Context } from "../types";
import { redis } from "./redisConfig";
import { Container } from "typedi";
import CompanyService from "../resolvers/company/company.service";
import { getRepository } from "typeorm";
import { Company, Job, User } from "../entities";
import JobService from "../resolvers/job/job.service";
import UserService from "../resolvers/user/user.service";
import authChecker from "../authChecker";

function inject<TEntity>( EntityClass: ClassType<TEntity>, id: string ) {
    Container.set( {
        id,
        factory: () => getRepository( EntityClass )
    } )
}

inject<Company>( Company, CompanyService.DI_KEY.toString() )
inject<Job>( Job, JobService.DI_KEY.toString() )
inject<User>( User, UserService.DI_KEY.toString() )

async function getApolloServerConfig() {
    return ( {
        schema: await buildSchema( {
            resolvers,
            validate: false,
            container: Container,
            authChecker,
            authMode: "error",
        } ),
        // @ts-ignore
        context: ( { req, res } ): Context => ( {
            req,
            res,
            redis,
        } ) as Context
    } )
}

export default getApolloServerConfig
