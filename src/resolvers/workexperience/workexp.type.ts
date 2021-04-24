import { ArgsType, Field, InputType } from "type-graphql";
import { WorkExperience } from "../../entities";

@InputType( { isAbstract: true } )
abstract class CreateUpdateWorkExpInput implements Partial<WorkExperience> {

    @Field()
    jobTitle: string

    @Field()
    company: string

    @Field( { nullable: true } )
    from?: string

    @Field( { nullable: true } )
    to?: string

}

@InputType()
class CreateWorkExpInput extends CreateUpdateWorkExpInput {
}

@InputType()
class UpdateWorkExpInput extends CreateUpdateWorkExpInput {
    @Field()
    id: number
}

@ArgsType()
export class CreateWorkExpArgs {
    @Field( () => CreateWorkExpInput )
    workExperience: CreateWorkExpInput
}

@ArgsType()
export class UpdateWorkExpArgs {
    @Field( () => UpdateWorkExpInput )
    workExperience: UpdateWorkExpInput
}

@ArgsType()
export class DeleteWorkExpArgs {
    @Field()
    id: number
}
