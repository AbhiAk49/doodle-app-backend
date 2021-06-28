const mongoose = require( 'mongoose' );

require( '../models/User' );
require( '../models/Sessions' );
require( '../models/Doodle' );


const uri = 'mongodb://localhost:27017/doodleDB';

mongoose.set( 'useFindAndModify', false );
mongoose.set( 'returnOriginal', false );

mongoose.connect( uri, { useNewUrlParser: true, useUnifiedTopology: true } );

mongoose.connection.on( 'open', () => {
    console.log( 'Connected to DB' )
} );

mongoose.connection.on( 'error', () => {
    console.error( err.message );
    process.exit( 1 );
} )