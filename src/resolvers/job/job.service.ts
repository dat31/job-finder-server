import { FindManyOptions, In, Like, Not, Repository } from "typeorm";
import { Job, User } from "../../entities";
import { Inject, Service } from "typedi";
import { BaseService } from "../../base";
import { Redis } from "ioredis";
import { redis } from "../../configs/redisConfig";
import { HottestCategory } from "../../../../web/src/types";
import { ReportJobResponse } from "./job.type";
import { EntityFieldsNames } from "typeorm/common/EntityFieldsNames";
import { FindConditions } from "typeorm/find-options/FindConditions";
import { ObjectLiteral } from "typeorm/common/ObjectLiteral";

@Service<Job>()
export default class JobService extends BaseService<Job> {

    static DI_KEY: String = "JOB_SERVICE"
    private ALREADY_DISPLAYED_JOB_IDS = "ALREADY_DISPLAYED_JOB_IDS"
    private LIMIT_DISPLAY_JOBS = 6

    private userRepository: Repository<User>
    private jobRepository: Repository<Job>
    private redis: Redis

    constructor(
        @Inject( JobService.DI_KEY.toString() ) [ jobRepo, userRepo ]: [ Repository<Job>, Repository<User> ] ) {
        super( jobRepo );
        this.userRepository = userRepo
        this.jobRepository = jobRepo
        this.redis = redis
    }

    getSalary( salaryRes: Job["salary"] ): string {
        if( !salaryRes ) {
            return "Offer"
        }
        if( Array.isArray( salaryRes ) && salaryRes.length > 0 ) {
            return salaryRes.length === 2
                ? `${ salaryRes[0] } - ${ salaryRes[1] }`
                : `Upto ${ salaryRes[0] }`
        }
        return "Offer"
    }

    async saveJob( userId: User["id"] | undefined, jobId: Job["id"] ) {
        const user = await this.userRepository.findOne( userId )
        if( !user ) {
            return null
        }
        if( !user.savedJobIds ) {
            await this.userRepository.update( user.id, { savedJobIds: [ jobId ] } )
            return jobId
        }
        if( user.savedJobIds.some( ( savedJobId ) => savedJobId === jobId ) ) {
            await this.userRepository.update( user.id, {
                savedJobIds: user.savedJobIds.filter( j => j !== jobId )
            } )
            return jobId
        }
        await this.userRepository.update( user.id, { savedJobIds: [ ...user.savedJobIds, jobId ] } )
        return jobId
    }

    getHottestCategories(): Promise<HottestCategory[]> {
        return Promise.resolve( [
            { title: "Development", numberOfJobs: "100+ jobs" },
            { title: "Design", numberOfJobs: "100+ jobs" },
            { title: "Security", numberOfJobs: "100+ jobs" },
            { title: "Development", numberOfJobs: "100+ jobs" },
            { title: "Design", numberOfJobs: "100+ jobs" },
            { title: "Security", numberOfJobs: "100+ jobs" },
        ] )
    }

    async reportJob( userId: User["id"] | undefined, jobId: Job["id"] ): Promise<ReportJobResponse> {
        if( !userId ) {
            return Promise.reject()
        }
        const alreadyDisplayedJobIds = await this.getAlreadyDisplayedJobIds()
        const user = await this.userRepository.findOne( userId )
        if( !user ) {
            return Promise.reject()
        }
        const notInIds = ( alreadyDisplayedJobIds ? alreadyDisplayedJobIds : [] )
            .concat( [ jobId ] )
            .concat( user?.reportedJobIds ? user.reportedJobIds : [] )
        const jobToReplace = await this.jobRepository.findOne( {
            id: Not( In( notInIds ) )
        } )
        await this.userRepository.update( userId, {
            ...user,
            reportedJobIds: user.reportedJobIds ? [ ...user.reportedJobIds, jobId ] : [ jobId ]
        } )
        return {
            jobToReplace,
            reportedJobId: jobId
        }
    }

    async getHottestJobs( userId: User["id"] | undefined ) {

        console.log( "GET HOTTEST JOB", userId )

        return this.getNewestOrHottestJob( userId, { viewCount: "DESC" } )
    }

    async getNewestJobs( userId: User["id"] | undefined ) {
        return this.getNewestOrHottestJob( userId, { createdAt: "DESC" } )
    }

    async getRelatedJobs( userId: User["id"] | undefined, jobCategory: string, currentJobId: Job["id"] ) {
        return this.jobRepository.find( await this.getFindCondition(
            userId,
            undefined,
            undefined,
            { title: Like( jobCategory ) },
            currentJobId ) )
    }

    async getAllJobs( userId: User["id"] | undefined ) {
        return this.getAll( await this.getFindCondition( userId ) )
    }

    private async getNewestOrHottestJob(
        userId: User["id"] | undefined,
        order?: { [P in EntityFieldsNames<Job>]?: "ASC" | "DESC" | 1 | -1; },
    ) {
        const result = await this.jobRepository.find( await this.getFindCondition( userId, order ) )
        if( result ) {
            await this.setAlreadyDisplayedJobIds( result.map( job => job.id ) )
        }
        return result
    }

    private async getAlreadyDisplayedJobIds(): Promise<Job["id"][] | undefined> {
        const hasDisplayedJobIds = await this.redis.get( this.ALREADY_DISPLAYED_JOB_IDS )
        return this.parseJson<Job["id"][]>( hasDisplayedJobIds )
    }

    private async setAlreadyDisplayedJobIds( jobIds: number[] ): Promise<void> {
        try {
            const alreadyDisplayedJobIds = await this.getAlreadyDisplayedJobIds()
            await this.redis.set(
                this.ALREADY_DISPLAYED_JOB_IDS,
                JSON.stringify( Array.isArray( alreadyDisplayedJobIds )
                    ? Array.from( new Set( jobIds.concat( alreadyDisplayedJobIds ) ) )
                    : jobIds
                )
            )
        } catch( _ ) {
            return Promise.resolve()
        }
    }

    private parseJson<T>( json: string | null ): T | undefined {
        if( json ) {
            return JSON.parse( json )
        }
        return undefined
    }

    private async getFindCondition(
        userId: User["id"] | undefined,
        order?: { [P in EntityFieldsNames<Job>]?: "ASC" | "DESC" | 1 | -1; },
        take: number = this.LIMIT_DISPLAY_JOBS,
        where: FindConditions<Job>[] | FindConditions<Job> | ObjectLiteral = {},
        omitJobId?: number,
    ): Promise<FindManyOptions<Job> | undefined> {

        console.log( { userId } )

        if( !userId ) {
            return ( { order, take } )
        }
        const user = await this.userRepository.findOne( userId )

        console.log( "asd", user )

        if( !user ) {
            return ( { order, take } )
        }
        const { notInterestedJobIds = [], reportedJobIds = [] } = user || {}
        const notIn = ( notInterestedJobIds ? notInterestedJobIds : [] )
            .concat( reportedJobIds ? reportedJobIds : [] )
            .concat( omitJobId ? omitJobId : [] )

        console.log( { notIn, notInterestedJobIds } )

        return ( {
            order,
            take,
            where: { id: Not( In( notIn ) ), ...where }
        } )
    }

}
