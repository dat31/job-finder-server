import BaseEntity from "../base/BaseEntity";
import { Column, Entity, OneToMany } from "typeorm";
import { Field, ObjectType } from "type-graphql";
import Job from "./Job";
import CompanyReview from "./CompanyReview";

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
    @Column( { type: 'enum', enum: Industry, nullable: true } )
    industry: string

    @Field( () => Job, { nullable: true } )
    @OneToMany( () => Job, job => job.company )
    jobs: Job[]

    @Field( () => CompanyReview, { nullable: true } )
    @OneToMany( () => CompanyReview, review => review.company )
    reviews: CompanyReview[]

}
