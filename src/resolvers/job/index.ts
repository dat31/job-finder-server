import { Arg, Args, Authorized, Ctx, FieldResolver, Int, Mutation, Query, Resolver, Root } from "type-graphql";
import { Company, Job } from "../../entities";
import { CreateJobArgs, DeleteJobResponse, JobResponse, ReportJobResponse, UpdateJobArgs } from "./job.type";
import JobService from "./job.service";
import { Service } from "typedi";
import { companyLoader } from "../../loader";
import { Equal, FindManyOptions, In, Like, Not } from "typeorm";
import { Context } from "../../types";
import UserService from "../user/user.service";
import { EntityFieldsNames } from "typeorm/common/EntityFieldsNames";
import { FindConditions } from "typeorm/find-options/FindConditions";
import { ObjectLiteral } from "typeorm/common/ObjectLiteral";
import { Redis } from "ioredis";

const LIMIT_DISPLAY_JOBS = 6
const ALREADY_DISPLAYED_JOB_IDS = "ALREADY_DISPLAYED_JOB_IDS"

@Service()
@Resolver( Job )
export default class JobResolver {

    constructor(
        private readonly userService: UserService,
        private readonly jobService: JobService
    ) {
    }

    @FieldResolver( () => Company )
    company( @Root() job: Job ) {
        return companyLoader.load( job.companyId )
    }

    @FieldResolver( () => String, { nullable: true } )
    salary( @Root() job: Job ) {
        const { salary } = job || {}
        if( Array.isArray( salary ) && salary.length > 0 ) {
            return salary.length === 2
                ? `${ salary[0] } - ${ salary[1] }`
                : `Upto ${ salary[0] }`
        }
        return "Offer"
    }

    @Mutation( () => Job, )
    createJob( @Args() { createJobInput }: CreateJobArgs ) {
        return this.jobService.create( createJobInput )
    }

    @Mutation( () => Job )
    updateJob( @Args() { updateJobInput }: UpdateJobArgs ) {
        return this.jobService.update( updateJobInput.id, updateJobInput as Job )
    }

    /**
     * @description after report job, replace that job by another one
     */
    @Authorized()
    @Mutation( () => ReportJobResponse, { nullable: true } )
    async reportJob(
        @Ctx() ctx: Context,
        @Arg( "jobId", () => Int ) jobId: number
    ): Promise<ReportJobResponse> {
        const alreadyDisplayedJobIds = await this.getHasDisplayedJobIds( ctx.redis )
        const notInIds = ( alreadyDisplayedJobIds ? alreadyDisplayedJobIds : [] ).concat( [ jobId ] )
        const jobToReplace = await this.jobService.findOne( {
            id: Not( In( notInIds ) )
        } )
        return {
            jobToReplace,
            reportedJobId: jobId
        }
    }

    @Query( () => JobResponse, { nullable: true } )
    async jobs( @Ctx() ctx: Context ): Promise<JobResponse | null> {
        return this.jobService.getAll( await this.getFindCondition( ctx ) );
    }

    @Query( () => JobResponse )
    async hottestJob( @Ctx() ctx: Context ): Promise<JobResponse | null> {
        return await this.jobService.getAll(
            await this.getFindCondition( ctx, { viewCount: "DESC" } )
        )
    }

    @Query( () => JobResponse )
    async newestJob( @Ctx() ctx: Context ): Promise<JobResponse> {
        return this.jobService.getAll(
            await this.getFindCondition( ctx, { createdAt: "DESC" } )
        )
    }

    @Query( () => JobResponse )
    async relatedJobs(
        @Ctx() ctx: Context,
        @Arg( "currentJobId", () => Int ) currentJobId: string,
        @Arg( "companyId", () => Int ) companyId: number,
        @Arg( "jobCategory", () => String ) jobCategory: string,
    ): Promise<JobResponse> {
        return this.jobService.getAll(
            await this.getFindCondition( ctx, undefined, undefined, {
                title: Like( jobCategory ),
                companyId: Equal( companyId ),
                id: Not( Equal( currentJobId ) )
            } )
        )
    }

    @Authorized( "ADMIN" )
    @Mutation( () => DeleteJobResponse )
    deleteJob( @Arg( "id", () => Int ) id: number ): Promise<DeleteJobResponse> {
        return this.jobService.delete( id )
    }

    @Query( () => Job, { nullable: true } )
    job( @Arg( "id", () => Int ) id: number ): Promise<Job | undefined> {
        return this.jobService.getById( id )
    }

    private async getFindCondition(
        ctx: Context,
        order?: { [P in EntityFieldsNames<Job>]?: "ASC" | "DESC" | 1 | -1; },
        take: number = LIMIT_DISPLAY_JOBS,
        where: FindConditions<Job>[] | FindConditions<Job> | ObjectLiteral = {}
    ): Promise<FindManyOptions<Job> | undefined> {
        const user = await this.userService.getById( ctx?.req.session.userId )
        const { notInterestedJobIds = [] } = user || {}
        if( !notInterestedJobIds || notInterestedJobIds.length <= 0 ) {
            return ( { order, take } )
        }
        return ( {
            order,
            take,
            where: { id: Not( In( notInterestedJobIds ) ), ...where }
        } )
    }

    private parseJson<T>( json: string | null ): T | null {
        if( json ) {
            return JSON.parse( json )
        }
        return null
    }

    private async setHasDisplayedJobIds( redis: Redis, value: any ): Promise<void> {
        try {
            await redis.set( ALREADY_DISPLAYED_JOB_IDS, JSON.stringify( value ) )
        } catch( _ ) {
            return Promise.resolve()
        }
    }

    private async getHasDisplayedJobIds( redis: Redis ): Promise<Job["id"][] | null> {
        const hasDisplayedJobIds = await redis.get( ALREADY_DISPLAYED_JOB_IDS )
        return this.parseJson<Job["id"][]>( hasDisplayedJobIds )
    }

}
