import { Inject, Service } from "typedi";
import { User } from "../../entities";
import { Repository } from "typeorm";
import { BaseService } from "../../base";

@Service<User>()
class UserService extends BaseService<User> {
    static DI_KEY: String = "USER_SERVICE"

    constructor(
        @Inject( UserService.DI_KEY.toString() )
        private readonly userRepository: Repository<User>
    ) {
        super( userRepository )
    }

}

export default UserService
