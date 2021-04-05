import BaseEntity from "./BaseEntity";
import { Field, Int, ObjectType } from "type-graphql";
import { Column, Entity, ManyToOne } from "typeorm";
import Company from "./Company";

enum EmploymentType {
    FULL_TIME = 'FULL_TIME',
    PART_TIME = 'PART_TIME'
}

@Entity()
@ObjectType()
export default class Job extends BaseEntity {

    @Field( () => String )
    @Column()
    title: string

    @Field()
    @ManyToOne( () => Company, company => company.jobs )
    company: Company

    @Field()
    @Column()
    description: string

    @Field()
    @Column( { type: 'enum', enum: EmploymentType } )
    employmentType: EmploymentType

    @Field( () => [ Int ] )
    @Column( { type: 'simple-array', nullable: true } )
    salary: number[]

    @Field( { nullable: true } )
    @Column()
    applicationDeadline: string

    @Field( () => Int, { nullable: true } )
    @Column()
    experience: number;

}
