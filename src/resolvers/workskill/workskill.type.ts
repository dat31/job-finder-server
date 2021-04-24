import { ArgsType, Field, InputType, Int } from "type-graphql";
import { User, WorkSkill } from "../../entities";

@InputType( { isAbstract: true } )
abstract class CreateUpdateWorkSkillInput implements Partial<WorkSkill> {

    @Field()
    skill: string

    @Field( { nullable: true } )
    yearOfExperience: number

}

@InputType()
class CreateWorkSkillInput extends CreateUpdateWorkSkillInput {

}

@InputType()
class UpdateWorkSkillInput extends CreateUpdateWorkSkillInput {
    @Field()
    id: number
}

@ArgsType()
export class CreateWorkSkillArgs {
    @Field( () => CreateWorkSkillInput )
    workSkill: CreateWorkSkillInput
}

@ArgsType()
export class UpdateWorkSkillArgs {
    @Field( () => CreateWorkSkillInput )
    workSkill: UpdateWorkSkillInput
}

@ArgsType()
export class DeleteWorkSkillArgs {
    @Field()
    id: number
}
