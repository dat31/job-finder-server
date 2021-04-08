import { ClassType, Field, Int, ObjectType } from "type-graphql";

export default function PaginatedResponse<T>(
    TEntity: ClassType<T> | String | Number | Boolean,
) {

    @ObjectType( { isAbstract: true } )
    abstract class PaginatedResponseClass {
        @Field( () => [ TEntity ] )
        items: T[];

        @Field( () => Int )
        total: number;

        @Field()
        hasMore: boolean;
    }

    return PaginatedResponseClass;
}
