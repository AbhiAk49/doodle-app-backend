const mongoose = require( 'mongoose' );

const doodleSchema = new mongoose.Schema({
    title: { type: String },
    time: { type: String , required: true},
    date: { type: String , required: true},
    users: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
    img64 : { type : String , required : true}
})


mongoose.model( 'Doodle', doodleSchema );