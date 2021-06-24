const mongoose = require( 'mongoose' );

const sessionSchema = new mongoose.Schema({
    // session_id : _id,
    // session_id: { 
    //     type: mongoose.Schema.Types.ObjectId,   
    //     index: true,
    //     required: true,
    //     auto: true
    // },
    time: { type: String , required: true},
    date: { type: String , required: true},
    users: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
    currentlyActive : { type : Boolean , default : true}
}
)


// sessionSchema.method('transform', function() {
//     var obj = this.toObject();

//     //Rename fields
//     obj.session_id = obj._id;
//     delete obj._id;

//     return obj;
// });


mongoose.model( 'Sessions', sessionSchema );