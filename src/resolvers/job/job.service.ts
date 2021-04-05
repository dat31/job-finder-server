import { JobResponse } from "./job.type";
import { getRepository, Repository } from "typeorm";
import { Job } from "../../entities";
import { Service } from "typedi";
import { BaseService } from "../../base";

@Service()
export default class JobService extends BaseService {
    private readonly jobRepository: Repository<Job> = getRepository( Job )

    async getAllJobs(): Promise<JobResponse> {
        const jobs = await this.jobRepository.find( {} )
        return { jobs }
    }

    async createJob( job: Job ): Promise<Job> {
        return this.jobRepository.create( job ).save()
    }
}
