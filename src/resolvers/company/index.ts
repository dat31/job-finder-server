import { Service } from "typedi";
import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { Company } from "../../entities";
import CompanyService from "./company.service";
import { CompanyInput, CompanyResponse } from "./company.type";

@Service()
@Resolver( Company )
export default class CompanyResolver {

    constructor( private readonly companyService: CompanyService ) {
    }

    @Query( () => CompanyResponse )
    companies(): Promise<CompanyResponse> {
        return this.companyService.getAll()
    }

    @Mutation( () => Company )
    createCompany(
        @Arg( 'company' ) company: CompanyInput
    ): Promise<Company> {
        return this.companyService.create( company )
    }
}
