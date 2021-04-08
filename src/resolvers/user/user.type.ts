import { Field, InputType, ObjectType } from "type-graphql";
import { User } from "../../entities";

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
