import { BaseEntity } from "../base";
import { Column, Entity, ManyToOne } from "typeorm";
import { Field, Int, ObjectType } from "type-graphql";
import User from "./User";

@Entity()
@ObjectType()
export default class WorkExperience extends BaseEntity {

    @Field()
    @Column()
    jobTitle: string

    @Field()
    @Column()
    company: string

    @Field( { nullable: true } )
    @Column( { nullable: true } )
    from?: string

    @Field( { nullable: true } )
    @Column( { nullable: true } )
    to?: string

    @Field( () => User )
    @ManyToOne( () => User, user => user.workExperiences, { onDelete: "CASCADE" } )
    user: User

    @Field( () => Int )
    @Column()
    userId: User["id"]

}
