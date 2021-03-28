import { IS_PRODUCTION } from "../constants";
import { Post } from "../entities/Post";
import { User } from "../entities/User";
import { Updoot } from "../entities/Updoot";
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
    entities: [ Post, User, Updoot ],
    migrations: [ path.join( __dirname, "./migrations/*" ) ],
}

export default connectionConfig as ConnectionOptions
