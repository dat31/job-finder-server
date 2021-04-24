import { IS_PRODUCTION } from "../constants";
import { User, Job, Company, CompanyReview, WorkExperience, WorkSkill } from "../entities";
import { ConnectionOptions } from "typeorm";
import { JobSubscriber } from "../subscribers";
import { DummyCompanies1618583235867 } from "../migrations/1618583235867-DummyCompanies";
import { DummyCompanyReviews1620052686114 } from "../migrations/1620052686114-DummyCompanyReviews";
import { DummyJob1620045765611 } from "../migrations/1620045765611-DummyJob";
import { Pool } from "pg"

export const pool = new Pool( {
    connectionString: process.env.DATABASE_URL,
    ssl: true,
    port: 5432,
    password: process.env.PG_PASSWORD,
    user: process.env.PG_USERNAME,
} )

const config = IS_PRODUCTION
    ? { url: process.env.DATABASE_URL }
    : { database: 'job-finder' }

const connectionConfig: ConnectionOptions = {
    ...config,
    // ssl: { rejectUnauthorized: false },
    type: 'postgres',
    port: 5432,
    username: process.env.PG_USERNAME,
    password: process.env.PG_PASSWORD,
    logging: true,
    synchronize: true,
    entities: [
        Job,
        Company,
        User,
        CompanyReview,
        WorkExperience,
        WorkSkill
    ],
    subscribers: [ JobSubscriber ],
    migrations: [
        DummyCompanies1618583235867,
        DummyCompanyReviews1620052686114,
        DummyJob1620045765611
    ],
}

export default connectionConfig as ConnectionOptions
