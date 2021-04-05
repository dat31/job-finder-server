import { IS_PRODUCTION } from "../constants";
import { Post, Updoot, User, Job, Company } from "../entities";
import path from "path";
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
    entities: [ Post, Job, Company, Updoot, User ],
    migrations: [ path.join( __dirname, "./migrations/*" ) ],
}

export default connectionConfig as ConnectionOptions
