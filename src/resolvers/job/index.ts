import { Args, Mutation, Query, Resolver } from "type-graphql";
import { Job } from "../../entities";
import { JobArgs, JobResponse } from "./job.type";
import JobService from "./job.service";
import { Service } from "typedi";

@Service()
@Resolver( Job )
export default class JobResolver {

    constructor( private readonly jobService: JobService ) {
    }

    @Query( () => JobResponse )
    async getAllJobs(): Promise<JobResponse> {
        return this.jobService.getAllJobs()
    }

    @Mutation( () => Job )
    async createJob( @Args(){ jobInput }: JobArgs ) {
        return this.jobService.createJob( jobInput )
    }
}
