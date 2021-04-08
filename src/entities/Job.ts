import BaseEntity from "../base/BaseEntity";
import { Field, Int, ObjectType } from "type-graphql";
import { Column, Entity, ManyToOne } from "typeorm";
import Company from "./Company";

export enum EmploymentType {
    FULL_TIME = 'FULL_TIME',
    PART_TIME = 'PART_TIME'
}

@Entity()
@ObjectType()
export default class Job extends BaseEntity {

    @Field( () => String )
    @Column()
    title: string

    @Field( () => Company )
    @ManyToOne( () => Company, company => company.jobs, { onDelete: "CASCADE" } )
    company: Company

    @Field( () => Int )
    @Column()
    companyId: Company['id']

    @Field()
    @Column()
    description: string

    @Field()
    @Column( { type: 'enum', enum: EmploymentType, nullable: true } )
    employmentType: EmploymentType

    @Field( () => String )
    @Column( { type: 'simple-array', nullable: true } )
    salary: number[]

    @Field( { nullable: true } )
    @Column( { nullable: true } )
    applicationDeadline: string

    @Field( () => Int, { nullable: true } )
    @Column( { nullable: true } )
    experience: number;

    @Field( () => Int, { nullable: true } )
    @Column( { nullable: true } )
    viewCount: number
}
