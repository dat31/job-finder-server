import { ArgsType, Field, InputType, ObjectType } from "type-graphql";
import { Job, User, WorkExperience, WorkSkill } from "../../entities";

@InputType()
export class RegisterInput {
    @Field()
    username: string

    @Field()
    password: string

    @Field()
    email: string
}

@ObjectType()
export class ErrorField {
    @Field()
    field: string

    @Field()
    message: string
}

@ObjectType()
export class UserResponse {
    @Field( () => [ ErrorField ], { nullable: true } )
    errors?: ErrorField[]

    @Field( () => User, { nullable: true } )
    user?: User
}

@ObjectType()
export class ProfileResponse {
    @Field( () => [ WorkExperience ], { nullable: true } )
    workExperiences: WorkExperience[]

    @Field( () => [ WorkSkill ], { nullable: true } )
    workSkills: WorkSkill[]
}

@ObjectType()
export class CurrentUserJobs {
    @Field( () => [ Job ], { nullable: true } )
    savedJobs: Job[]

    @Field( () => [ Job ], { nullable: true } )
    appliedJobs: Job[]
}

@ArgsType()
export class LoginReq {
    @Field()
    usernameOrEmail: string

    @Field()
    password: string
}

@ArgsType()
export class ChangePasswordReq {
    @Field()
    token: string

    @Field()
    newPassword: string
}