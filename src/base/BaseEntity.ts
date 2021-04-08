import {
    BaseEntity as ORMBaseEntity,
    CreateDateColumn, Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";
import { Field, ObjectType } from "type-graphql";


@Entity()
@ObjectType()
export default abstract class BaseEntity extends ORMBaseEntity {
    @Field()
    @PrimaryGeneratedColumn()
    id!: number;

    @Field()
    @CreateDateColumn( { type: 'text' } )
    createdAt: string

    @Field()
    @UpdateDateColumn( { type: 'text' } )
    updatedAt: string
}
