import DataLoader from "dataloader";
import { Job, User } from "../entities";
import { getRepository } from "typeorm";

function createJobSaveStatusLoader( userId: User["id"] | undefined ) {
    return new DataLoader<Job["id"], boolean>(
        async function( keys: readonly number[] ): Promise<boolean[]> {
            const user = await getRepository( User ).findOne( userId )
            if( !user ) {
                return keys.map( () => false )
            }
            const { savedJobIds } = user
            if( !savedJobIds ) {
                return keys.map( () => false )
            }
            return keys.map( k => savedJobIds.includes( k ) )
        } )

}

export default createJobSaveStatusLoader
