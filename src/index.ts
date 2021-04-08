import path from "path";

require( 'dotenv' ).config()

import 'reflect-metadata'
import express from 'express'
import { ApolloServer } from 'apollo-server-express'
import session from 'express-session';
import cors from 'cors'
import { createConnection } from 'typeorm'
import {
    connectionConfig,
    getApolloServerConfig,
    sessionConfig
} from "./configs";


// const GEO_IP_API_KEY = "78090704917faeb36915443852bc5c55"
//        "typeorm": "node --require ts-node/register ./node_modules/typeorm/cli.js",
( async function() {
    try {
        const port = parseInt( process.env.PORT as string )
        const conn = await createConnection( {
            ...connectionConfig,
            migrations: [ path.join( __dirname, "./migrations/*" ) ],
        } )
        // await conn.runMigrations()
        const app = express()
        app.use( cors( {
            origin: process.env.CORS_ORIGIN,
            credentials: true,
        } ) )
        app.set( 'trust proxy', 1 )
        app.use( session( sessionConfig ) )
        const apolloServer = new ApolloServer( await getApolloServerConfig() );
        apolloServer.applyMiddleware( { app, cors: false } )
        app.listen( port )
    } catch( e ) {
        console.log( '------APP ERROR------', e )
    }
} )();

function handleUnCaughtException( error: Error ) {
    console.log( '-----UN_CAUGHT_EXCEPTION-----', error );
}

process.on( 'uncaughtException', handleUnCaughtException );
