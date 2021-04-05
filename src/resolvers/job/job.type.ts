import { ArgsType, Field, InputType, ObjectType } from "type-graphql";
import { Job } from "../../entities";

@ObjectType()
export class JobResponse {
    @Field( () => [ Job ] )
    jobs: Job[]
}

@InputType()
export class JobInput extends Job {
    @Field()
    asd: string
}

@ArgsType()
export class JobArgs {
    @Field( () => JobInput )
    jobInput: JobInput
}
