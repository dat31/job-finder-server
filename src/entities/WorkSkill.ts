import { Column, Entity, ManyToOne } from "typeorm";
import { BaseEntity } from "../base";
import { Field, Int, ObjectType } from "type-graphql";
import User from "./User";

@Entity()
@ObjectType()
export default class WorkSkill extends BaseEntity {

    @Field()
    @Column()
    skill: string

    @Field( { nullable: true } )
    @Column( { nullable: true } )
    yearOfExperience: number

    @Field( () => User )
    @ManyToOne( () => User, user => user.workSkills, { onDelete: "CASCADE" } )
    user: User

    @Field( () => Int )
    @Column()
    userId: User["id"]

}
