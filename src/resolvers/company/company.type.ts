import { Field, InputType, ObjectType } from "type-graphql";
import { PaginatedResponse } from "../../base";
import { Company } from "../../entities";

@ObjectType()
export class CompanyResponse extends PaginatedResponse( Company ) {

}

@InputType()
export class CompanyInput extends Company {
    @Field()
    name: string;

    @Field()
    industry: string;

    @Field()
    location: string;
}
