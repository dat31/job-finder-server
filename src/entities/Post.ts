import { Field, Int, ObjectType } from "type-graphql";
import {
    Column,
    Entity,
    ManyToOne,
    OneToMany,
} from "typeorm";
import User from "./User";
import Updoot from "./Updoot";
import BaseEntity from "./BaseEntity";

@ObjectType()
@Entity()
export default class Post extends BaseEntity {

    @Field()
    @Column()
    title!: string;

    @Field( () => Int, { nullable: true } )
    voteStatus: number | null;

    @Field()
    @Column()
    creatorId!: number;

    @Field()
    @Column()
    text!: string;

    @Field()
    @Column( { type: 'int', default: 0 } )
    points: number;

    @Field( () => User )
    @ManyToOne( () => User, user => user.posts )
    creator: User

    @OneToMany( () => Updoot, ud => ud.post )
    updoots: Updoot[]

}
