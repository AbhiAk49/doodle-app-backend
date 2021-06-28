const mongoose = require( 'mongoose' );
const moment  = require('moment');
const Sessions = mongoose.model('Sessions');
const Doodle = mongoose.model('Doodle');

const createDoodle = async (req, res, next) => {
    let title = req.body.title;
    let sessionId = req.body.sessionId;
    let base64 = req.body.base64;
    const currentUser = res.locals.claims;
    try{
        const session = await Sessions.findByIdAndUpdate(sessionId, { "currentlyActive" : false});
        if(title===undefined){
            title = moment(session.date,'DD/MM/YYYY');
        }
        const doodle = 
        {
            title,
            time : session.time,
            date : session.date,
            users : session.users,
            img64 : base64

        };

        const createdDoodle = await Doodle.create(doodle);
        res.status( 201 ).json( createdDoodle );
    }
    catch(err){
                if( err.name === 'ValidationError' ){
            err.status = 400;
        }else {
            err.status = 500;
        }

        return next( err );
    }
}
const getDoodles = async (req, res, next) => {
    const currentUser = res.locals.claims;
    let updatedDoodle = [];
    try{
        await Doodle.find({})
            .populate({
                path: 'users',
                select: 'name email',
            })
            .then(doodles=>{
                doodles.forEach(doodle => {
                    let flag = false;
                    doodle.users.forEach(user=>{
                        if(user.email === currentUser.email){
                            flag = true;
                        }
                    })
                    if(flag){
                        updatedDoodle.push(doodle);
                    }
                })
            })
        res.status( 201 ).json( updatedDoodle );
    }
    catch(err){
                if( err.name === 'ValidationError' ){
            err.status = 400;
        }else {
            err.status = 500;
        }

        return next( err );
    }
}
module.exports = {
    createDoodle,
    getDoodles
}