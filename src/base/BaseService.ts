import { Service } from "typedi";
import BaseEntity from "./BaseEntity";
import { DeepPartial, FindManyOptions, Repository, UpdateResult } from "typeorm";
import { PaginatedResponse } from "./index";
import { QueryDeepPartialEntity } from "typeorm/query-builder/QueryPartialEntity";
import { ObjectID } from "typeorm/driver/mongodb/typings";
import { FindConditions } from "typeorm/find-options/FindConditions";

type PaginatedResponse<T> = {
    items: T[],
    hasMore: boolean,
    total: number
}

type Criteria<T extends BaseEntity> =
    string
    | string[]
    | number
    | number[]
    | Date
    | Date[]
    | ObjectID
    | ObjectID[]
    | FindConditions<T>

@Service()
export default abstract class BaseService<TEntity extends BaseEntity> {

    protected constructor( private repository: Repository<TEntity> ) {
    }

    async getAll( options?: FindManyOptions<TEntity> | undefined ): Promise<PaginatedResponse<TEntity>> {
        const [ items, total ] = await this.repository.findAndCount( options )
        return {
            items,
            total,
            hasMore: true
        }
    }

    getRepository(): Repository<TEntity> {
        return this.repository
    }

    getById( id?: TEntity['id'] ): Promise<TEntity | undefined> {
        return this.repository.findOne( id )
    }

    create( entity: DeepPartial<TEntity> ): Promise<TEntity> {
        return this.repository.create( entity ).save()
    }

    update(
        criteria: Criteria<TEntity> | number,
        partialEntity: QueryDeepPartialEntity<TEntity>
    ): Promise<QueryDeepPartialEntity<TEntity>> {
        return this.repository
            .update( criteria, partialEntity )
            .then( () => partialEntity )
    }

    async updateBasedOnPrevious(
        id: number,
        updateFn: ( previousValue: TEntity ) => QueryDeepPartialEntity<TEntity>
    ): Promise<UpdateResult> {
        const value = await this.repository.findOne( id )
        if( value ) {
            return this.repository.update( id, updateFn( value ) )
        }
        return Promise.reject()
    }

    delete( criteria: Criteria<TEntity> ): Promise<number> {
        return this.repository
            .delete( criteria )
            .then( () => ( criteria as any ).id
                ? ( criteria as any ).id
                : criteria
            )
    }
}
