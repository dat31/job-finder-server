import BaseEntity from "./BaseEntity";
import { Column, Entity, OneToMany } from "typeorm";
import { Field, ObjectType } from "type-graphql";
import Job from "./Job";

enum Industry {
    INDUSTRY1 = 'INDUSTRY1',
    INDUSTRY2 = 'INDUSTRY2'
}

@Entity()
@ObjectType()
export default class Company extends BaseEntity {

    @Field()
    @Column()
    name: string

    @Field()
    @Column()
    location: string

    @Field()
    @Column( { type: 'enum', enum: Industry } )
    industry: Industry

    @Field( () => Job )
    @OneToMany( () => Job, job => job.company )
    jobs: Job[]

}
