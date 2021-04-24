import { EntitySubscriberInterface, LoadEvent } from "typeorm";
import { Job } from "../entities";

class JobSubscriber implements EntitySubscriberInterface<Job> {

    listenTo(): Function | string {
        return Job
    }

    afterLoad( entity: Job, event?: LoadEvent<Job> ): Promise<any> | void {
        console.log( "LOAD JOB" )
    }

}

export default JobSubscriber
