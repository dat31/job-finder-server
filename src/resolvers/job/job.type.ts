import { ArgsType, Field, InputType, Int, ObjectType } from "type-graphql";
import { Job } from "../../entities";
import { PaginatedResponse } from "../../base";
import Company from "../../entities/Company";
import { EmploymentType } from "../../entities/Job";

@ObjectType()
export class JobResponse extends PaginatedResponse( Job ) {

}

@ObjectType()
export class ReportJobResponse {
    @Field( () => Job )
    jobToReplace: Job | undefined

    @Field( () => Int )
    reportedJobId: Job["id"]
}

@ObjectType()
export class CategoriesResponse {
    @Field()
    title: string
    @Field()
    numberOfJobs: string
}

@InputType()
abstract class BaseJobInput implements Partial<Job> {
    @Field( () => String )
    title: string

    @Field( () => String, { nullable: true } )
    description: string

    @Field( { nullable: true } )
    employmentType: EmploymentType

    @Field( () => [ Int ], { nullable: true } )
    salary: number[]

    @Field( () => String, { nullable: true } )
    applicationDeadline: string

    @Field( () => Int, { nullable: true } )
    experience: number;
}

@InputType()
export class CreateJobInput extends BaseJobInput {
    @Field( () => Int )
    companyId: Company['id']
}

@InputType()
export class UpdateJobInput extends BaseJobInput {
    @Field( () => Int )
    id: Job['id']
}

@ArgsType()
export class CreateJobArgs {
    @Field( () => CreateJobInput )
    createJobInput: CreateJobInput
}

@ArgsType()
export class UpdateJobArgs {
    @Field( () => UpdateJobInput )
    updateJobInput: UpdateJobInput
}
