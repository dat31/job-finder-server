import { Repository } from "typeorm";
import { WorkSkill } from "../../entities";
import { Inject, Service } from "typedi";
import { BaseService } from "../../base";

@Service<WorkSkill>()
export default class WorkSkillService extends BaseService<WorkSkill> {
    static DI_KEY: String = "WORK_SKILL_SERVICE"

    constructor(
        @Inject( WorkSkillService.DI_KEY.toString() ) repository: Repository<WorkSkill> ) {
        super( repository );
    }
}
