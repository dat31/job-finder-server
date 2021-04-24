import { getRepository } from "typeorm";
import DataLoader from "dataloader";
import { ClassType } from "type-graphql";
import { BaseEntity } from "../base";

function createCommonLoader<K, V extends BaseEntity>(
    TClass: ClassType<V>
) {
    async function batchLoadFn( keys: readonly K[] ): Promise<V[]> {
        const result = await getRepository( TClass ).findByIds( keys as any[] )
        const map = new Map()
        for( const record of result ) {
            map.set( record.id, record )
        }
        return keys.map( ( key ) => map.get( key ) )
    }

    return new DataLoader<K, V>( batchLoadFn )
}

export default createCommonLoader
