import { Authorized, Field, ObjectType } from "type-graphql";
import {
    Column,
    Entity,
    OneToMany
} from "typeorm";
import Post from "./Post";
import Updoot from "./Updoot";
import BaseEntity from "../base/BaseEntity";

enum Roles {
    COMPANY = "COMPANY",
    CANDIDATE = "CANDIDATE"
}

@ObjectType()
@Entity()
export default class User extends BaseEntity {

    @OneToMany( () => Post, post => post.creator )
    posts: Post[]

    @OneToMany( () => Updoot, ud => ud.userId )
    updoots: Updoot[]

    @Field()
    @Column( { unique: true } )
    username!: string;

    @Field()
    @Column( { unique: true } )
    email!: string;

    @Column()
    password!: string;

    @Column( "int", { array: true, nullable: true } )
    savedJobIds: number[]

    @Column( "int", { array: true, nullable: true } )
    notInterestedJobIds: number[] | null | undefined

}
