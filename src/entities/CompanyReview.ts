import { Column, Entity, ManyToOne } from "typeorm";
import { Field, Int, ObjectType } from "type-graphql";
import { BaseEntity } from "../base";
import Company from "./Company";

@ObjectType()
@Entity()
class CompanyReview extends BaseEntity {

    @Field()
    @Column()
    title: String

    @Field()
    @Column()
    text: string

    @Field( () => Company )
    @ManyToOne( () => Company, company => company.reviews )
    company: Company

    @Field()
    @Column()
    stars: number

    @Field( () => Int )
    @Column()
    companyId: Company['id']

}

export default CompanyReview
