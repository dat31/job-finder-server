import { Arg, Args, Authorized, Ctx, Field, FieldResolver, Int, Mutation, Query, Resolver, Root } from "type-graphql";
import { Company, Job } from "../../entities";
import { CategoriesResponse, CreateJobArgs, JobResponse, ReportJobResponse, UpdateJobArgs } from "./job.type";
import JobService from "./job.service";
import { Service } from "typedi";
import { companyLoader, createJobSaveStatusLoader } from "../../loader";
import { Context } from "../../types";
import UserService from "../user/user.service";

@Service()
@Resolver( Job )
export default class JobResolver {

    constructor(
        private readonly userService: UserService,
        private readonly jobService: JobService
    ) {
    }

    @FieldResolver( () => Company )
    company( @Root() job: Job ): Promise<Company> {
        return companyLoader.load( job.companyId )
    }

    @FieldResolver( () => Boolean )
    hasBeenSaved( @Root() job: Job, @Ctx() ctx: Context ): Promise<boolean> {
        return createJobSaveStatusLoader( ctx.req.session.userId ).load( job.id )
    }

    @FieldResolver( () => Boolean )
    hasBeenReported( @Root() job: Job ) {
        return false
    }

    @FieldResolver( () => String, { nullable: true } )
    salary( @Root() job: Job ): string {
        return this.jobService.getSalary( job?.salary )
    }

    @Mutation( () => Job, )
    createJob( @Args() { createJobInput }: CreateJobArgs ) {
        return this.jobService.create( createJobInput )
    }

    @Mutation( () => Job )
    updateJob( @Args() { updateJobInput }: UpdateJobArgs ) {
        return this.jobService.update( updateJobInput.id, updateJobInput as Job )
    }

    @Authorized()
    @Mutation( () => Int, { nullable: true } )
    async saveJob( @Ctx() ctx: Context,
                   @Arg( "jobId", () => Int ) jobId: number ): Promise<number | null> {
        return this.jobService.saveJob( ctx.req.session.userId, jobId )
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
        return this.jobService.reportJob( ctx.req.session.userId, jobId )
    }

    @Query( () => JobResponse, { nullable: true } )
    async jobs( @Ctx() ctx: Context ): Promise<JobResponse | null> {
        return this.jobService.getAllJobs( ctx.req.session.userId )
    }

    @Query( () => [ Job ] )
    async hottestJob( @Ctx() ctx: Context ): Promise<Job[] | null> {
        console.log( "HOTTEST JOB RESOLVER", ctx.req.session.userId )
        return this.jobService.getHottestJobs( ctx.req.session.userId )
    }

    @Query( () => [ Job ] )
    async newestJob( @Ctx() ctx: Context ): Promise<Job[]> {
        return this.jobService.getNewestJobs( ctx.req.session.userId )
    }

    @Query( () => [ Job ] )
    async relatedJobs(
        @Ctx() ctx: Context,
        @Arg( "currentJobId", () => Int ) currentJobId: number,
        @Arg( "companyId", () => Int ) companyId: number,
        @Arg( "jobCategory", () => String ) jobCategory: string,
    ): Promise<Job[]> {
        return this.jobService.getRelatedJobs( ctx.req.session.userId, jobCategory, currentJobId )
    }

    @Query( () => [ CategoriesResponse ] )
    hottestCategories(): Promise<CategoriesResponse[]> {
        return this.jobService.getHottestCategories()
    }

    @Authorized( "ADMIN" )
    @Mutation( () => Int )
    deleteJob( @Arg( "id", () => Int ) id: number ): Promise<number> {
        return this.jobService.delete( id )
    }

    @Query( () => Job, { nullable: true } )
    job( @Arg( "id", () => Int ) id: number ): Promise<Job | undefined> {
        return this.jobService.getById( id )
    }

}
