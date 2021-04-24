import { buildSchema } from "type-graphql";
import resolvers from "../resolvers";
import { Context } from "../types";
import { redis } from "./redisConfig";
import { Container } from "typedi";
import { EntityTarget, getRepository } from "typeorm";
import { Company, Job, User, WorkExperience, WorkSkill } from "../entities";
import JobService from "../resolvers/job/job.service";
import UserService from "../resolvers/user/user.service";
import WorkExperienceService from "../resolvers/workexperience/workexp.service";
import CompanyService from "../resolvers/company/company.service";
import authChecker from "../authChecker";
import WorkSkillService from "../resolvers/workskill/workskill.service";

function inject( EntityClass: EntityTarget<unknown> | EntityTarget<unknown>[], id: string ) {
    Container.set( {
        id,
        factory: () => Array.isArray( EntityClass )
            ? EntityClass.map( Class => getRepository( Class ) )
            : getRepository( EntityClass )
    } )
}

inject( Company, CompanyService.DI_KEY.toString() )
inject( [ Job, User ], JobService.DI_KEY.toString() )
inject( [ User, WorkExperience, WorkSkill, Job ], UserService.DI_KEY.toString() )
inject( WorkExperience, WorkExperienceService.DI_KEY.toString() )
inject( WorkSkill, WorkSkillService.DI_KEY.toString() )

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
