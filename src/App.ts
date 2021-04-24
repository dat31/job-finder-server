import express, { Express } from "express";
import session from "express-session";
import { connectionConfig, getApolloServerConfig, sessionConfig } from "./configs";
import { ApolloServer } from "apollo-server-express";
import { createConnection } from "typeorm";
import { IS_PRODUCTION } from "./constants";
import cors from "cors";
import { User } from "./entities";
import { pool } from "./configs/connectionConfig";

class App {

    private readonly express: Express = express()

    public async listen( port: number ) {
        await this.setupApp()
        this.express.listen( port )
    }

    private async setupApp(): Promise<void> {
        if ( IS_PRODUCTION ) {
            console.log( "RUNNING IN PRODUCT ENV OKAY" )
            console.log( "CONFIG", connectionConfig )
            this.express.set( 'trust proxy', 1 )
            await pool.connect()
        }
        const conn = await createConnection( connectionConfig )
        await conn.runMigrations()
        // await User.delete( {} )
        this.express.use( session( sessionConfig ) )
        this.express.use( cors( {
            origin: process.env.CORS_ORIGIN,
            credentials: true,
        } ) )
        const apolloServer = new ApolloServer( await getApolloServerConfig() );
        apolloServer.applyMiddleware( { app: this.express, cors: false } )

    }

}

export default new App()
