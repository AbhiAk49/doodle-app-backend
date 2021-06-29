const mongoose = require( 'mongoose' );

require( '../models/User' );
require( '../models/Sessions' );
require( '../models/Doodle' );

const {NODE_ENV,DB_HOST,DB_NAME} = process.env;

const connectionStr = NODE_ENV === 'development' ? `mongodb://${DB_HOST}/${DB_NAME}` : '';
console.log(connectionStr);
console.log(`Connecting to database ${DB_NAME}`);


mongoose.set( 'useFindAndModify', false );
mongoose.set( 'returnOriginal', false );

mongoose.connect( connectionStr, { useNewUrlParser: true, useUnifiedTopology: true } );

mongoose.connection.on( 'open', () => {
    console.log( `Connected to database ${DB_NAME}` )
} );

mongoose.connection.on( 'error', () => {
    console.error( `Could not connect to database ${DB_NAME}, error = `,  err.message );
    process.exit( 1 );
} )