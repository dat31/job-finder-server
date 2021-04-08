import { IS_PRODUCTION } from "../constants";
import { Post, Updoot, User, Job, Company, CompanyReview } from "../entities";
import { ConnectionOptions } from "typeorm";

const connectionConfig = {
    type: 'postgres',
    ...IS_PRODUCTION
        ? {
            url: process.env.DATABASE_URL,
            ssl: {
                rejectUnauthorized: false
            },
        }
        : { database: 'lireddit2' },
    username: 'postgres',
    password: '123',
    logging: true,
    synchronize: true,
    entities: [ Post, Job, Company, Updoot, User, CompanyReview ],
}

export default connectionConfig as ConnectionOptions
