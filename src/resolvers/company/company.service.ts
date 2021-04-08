import { Inject, Service } from "typedi";
import { BaseService } from "../../base";
import { Repository } from "typeorm";
import { Company } from "../../entities";

@Service<Company>()
export default class CompanyService extends BaseService<Company> {

    static readonly DI_KEY: String = "COMPANY_SERVICE"

    private readonly companyRepository: Repository<Company>

    constructor(
        @Inject( CompanyService.DI_KEY.toString() )
            repository: Repository<Company>
    ) {
        super( repository );
        this.companyRepository = repository;
    }

}
