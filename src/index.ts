import { Container } from "typedi";

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

( async () => {
    try {
        const port = parseInt( process.env.PORT as string )
        await createConnection( connectionConfig )
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
    } catch ( e ) {
        console.log( '------APP ERROR------', e )
    }
} )();

process.on( 'uncaughtException', ( err ) => {
    console.log( '-----UN_CAUGHT_EXCEPTION-----', err );
} );
