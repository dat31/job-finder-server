import { Field, ObjectType } from "type-graphql";
import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
    BaseEntity, OneToMany
} from "typeorm";
import { Post } from "./Post";
import { Updoot } from "./Updoot";

@ObjectType()
@Entity()
export class User extends BaseEntity {
    @Field()
    @PrimaryGeneratedColumn()
    id!: number;

    @Field()
    @CreateDateColumn( { type: 'text' } )
    createdAt: Date

    @Field()
    @UpdateDateColumn( { type: 'text' } )
    updatedAt: Date

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

}
