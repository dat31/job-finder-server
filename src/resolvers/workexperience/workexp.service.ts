import { Repository } from "typeorm";
import { WorkExperience } from "../../entities";
import { Inject, Service } from "typedi";
import { BaseService } from "../../base";

@Service<WorkExperience>()
export default class WorkExperienceService extends BaseService<WorkExperience> {
    static DI_KEY: String = "WORK_EXP_SERVICE"

    constructor(
        @Inject( WorkExperienceService.DI_KEY.toString() ) repository: Repository<WorkExperience> ) {
        super( repository );
    }
}
