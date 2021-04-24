import { Field, Int, ObjectType } from "type-graphql";
import {
    Column,
    Entity,
    OneToMany
} from "typeorm";
import BaseEntity from "../base/BaseEntity";
import WorkExperience from "./WorkExperience";
import WorkSkill from "./WorkSkill";

enum UserRole {
    COMPANY = "COMPANY",
    CANDIDATE = "CANDIDATE"
}

@ObjectType()
@Entity()
export default class User extends BaseEntity {

    @Field()
    @Column( { unique: true } )
    username!: string;

    @Field()
    @Column( { unique: true } )
    email!: string;

    @Column()
    password!: string;

    @Field( () => [ Int ], { nullable: true } )
    @Column( "int", {
        array: true,
        nullable: true
    } )
    savedJobIds: number[]

    @Field( () => [ Int ], { nullable: true } )
    @Column( "int", {
        array: true,
        nullable: true
    } )
    notInterestedJobIds: number[] | null | undefined

    @Field( () => [ Int ], { nullable: true } )
    @Column( "int", {
        array: true,
        nullable: true,
    } )
    reportedJobIds: number[] | null | undefined

    @Field( () => [ WorkExperience ] )
    @OneToMany( () => WorkExperience, workExp => workExp.userId )
    workExperiences: WorkExperience[]

    @Field( () => [ WorkSkill ] )
    @OneToMany( () => WorkSkill, workSkill => workSkill.userId )
    workSkills: WorkSkill[]

}
