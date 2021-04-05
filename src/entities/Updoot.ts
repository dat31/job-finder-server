import { Field, ObjectType } from "type-graphql";
import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne, PrimaryColumn,
} from "typeorm";
import User from "./User";
import Post from "./Post";

@ObjectType()
@Entity()
export default class Updoot extends BaseEntity {

    @Field()
    @PrimaryColumn()
    userId: number

    @Field()
    @PrimaryColumn()
    postId: number

    @Field()
    @Column()
    value: number;

    @Field( () => User )
    @ManyToOne( () => User, user => user.updoots )
    user: User

    @Field( () => Post )
    @ManyToOne( () => Post, post => post.updoots, { onDelete: "CASCADE" } )
    post: Post

    @Field()
    @CreateDateColumn()
    createdAt: Date

}
