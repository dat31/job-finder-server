import { Repository } from "typeorm";
import { Job } from "../../entities";
import { Inject, Service } from "typedi";
import { BaseService } from "../../base";

@Service<Job>()
export default class JobService extends BaseService<Job> {
    static DI_KEY: String = "JOB_SERVICE"

    constructor(
        @Inject( JobService.DI_KEY.toString() )repository: Repository<Job> ) {
        super( repository );
    }
}
