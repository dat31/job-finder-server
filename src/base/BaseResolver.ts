import BaseEntity from "./BaseEntity";
import { Arg, ClassType, Ctx, Field, Int, Mutation, ObjectType, Query, Resolver } from "type-graphql";
import BaseService from "./BaseService";
import { PaginatedResponse } from "./index";
import { Service } from "typedi";
import { capitalize } from "../utils/stringUtils";
import { FindManyOptions } from "typeorm";
import { Context } from "../types";

function BaseResolver<TEntity extends BaseEntity>(
    TEntityClass: ClassType<TEntity>
) {
    const entityName = capitalize( TEntityClass.name )

    @ObjectType()
    class GetAllResponse extends PaginatedResponse( TEntityClass ) {
    }

    @ObjectType()
    class DeleteResponse {
        @Field( () => Int )
        deletedId: number
    }

    @Service()
    @Resolver( () => TEntityClass, { isAbstract: true } )
    abstract class BaseResolverClass {

        private readonly service: BaseService<TEntity>

        protected constructor( service: BaseService<TEntity> ) {
            this.service = service
        }

        @Query( () => GetAllResponse, { name: `getAll${ entityName }s` } )
        protected getAll(
            @Ctx() ctx?: Context,
            options?: FindManyOptions<TEntity> | undefined
        ): Promise<GetAllResponse> {
            return this.service.getAll( options )
        }

        @Query( () => TEntityClass, { name: `get${ entityName }ById` } )
        protected getById( @Arg( "id", () => Int ) id: number ) {
            return this.service.getById( id )
        }

        @Mutation( () => DeleteResponse, { name: `delete${ entityName }` } )
        delete( @Arg( "id", () => Int ) id: number ) {
            return this.service.delete( id )
        }

        // @Mutation( () => TEntityClass, { name: `create${ entityName }` } )
        // protected create( @Arg( entityName.toLowerCase(), () => TEntityClass )entity: TEntity ) {
        //     return this.service.create( entity as unknown as DeepPartial<TEntity> )
        // }
    }

    return BaseResolverClass
}

export default BaseResolver
