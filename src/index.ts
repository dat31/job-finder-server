require( 'dotenv' ).config( { path: `.env.${ process.env.NODE_ENV || `development` }` } )
require( "reflect-metadata" )
import app from "./App";

// "typeorm": "node --require ts-node/register ./node_modules/typeorm/cli.js",

const PORT = parseInt( process.env.PORT as string )

function handleAppError( error: Error ) {
    console.log( '-----APP_ERROR-----', error );
}

app.listen( PORT ).catch( handleAppError )
process.on( 'uncaughtException', handleAppError );
