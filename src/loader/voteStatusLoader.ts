import DataLoader, { BatchLoadFn } from 'dataloader'
import { Updoot } from "../entities/Updoot";

type Key = {
    postId: number
    userId: number
}

async function batchLoadFn( keys: readonly Key[] ): Promise<Updoot[]> {
    const result = await Updoot.findByIds( keys as Key[] )
    const map = new Map()
    result.forEach( e => {
        map.set( `${ e.userId }_${ e.postId }`, e )
    } )
    return keys.map( k => map.get( `${ k.userId }_${ k.postId }` ) )
}

const voteStatusLoader = new DataLoader<Key, Updoot>( batchLoadFn )

export default voteStatusLoader
