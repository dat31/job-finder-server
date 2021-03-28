import { BaseEntity as ORMBaseEntity, CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Field } from "type-graphql";

export default abstract class BaseEntity extends ORMBaseEntity {
    @Field()
    @PrimaryGeneratedColumn()
    id!: number;

    @Field()
    @CreateDateColumn( { type: 'text' } )
    createdAt: Date

    @Field()
    @UpdateDateColumn( { type: 'text' } )
    updatedAt: Date
}
