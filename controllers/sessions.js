const mongoose = require( 'mongoose' );
const Sessions = mongoose.model('Sessions');
const Users = mongoose.model('User');
const formatSession = require('../utils/formatSession');
const {getUserAsynch,getAddedUsersAsynch} = require('../utils/getUserAsynch');
const createSession = async (req, res, next) => {
    let users = req.body;
    const currentUser = res.locals.claims;
    let SessionInitailize = formatSession();
    try{
        const foundUser = await getUserAsynch(currentUser);
        const addedUsers = await getAddedUsersAsynch(users);
        const newSession  = await Sessions.create( SessionInitailize );
        newSession.users.push(foundUser._id);
        addedUsers.forEach((user)=>newSession.users.push(user._id));
        const updatedSession = await Sessions.findOneAndUpdate({_id:newSession._id},newSession);
        res.status( 201 ).json( updatedSession );
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

const getAllSessions = async (req, res, next) => {
    //const currentUser = res.locals.claims;
    try{
        const totalSessions = await Sessions.find({})
            .populate({
                path: 'users',
                select: 'name email'
            })
        res.status( 201 ).json( totalSessions );
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

const getActiveSessions = async (req, res, next) => {
    const currentUser = res.locals.claims;
    let updatedSessions = [];
    try{
        await Sessions.find({"currentlyActive": true})
            .populate({
                path: 'users',
                select: 'name email',
            })
            .then(sessions=>{
                sessions.forEach(session => {
                    let flag = false;
                    session.users.forEach(user=>{
                        if(user.email === currentUser.email){
                            flag = true;
                        }
                    })
                    if(flag){
                        updatedSessions.push(session);
                    }
                })
            })
        res.status( 201 ).json( updatedSessions );
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
const getInactiveSessions = async (req, res, next) => {
    const currentUser = res.locals.claims;
    let updatedSessions = [];
    try{
        await Sessions.find({"currentlyActive": false})
            .populate({
                path: 'users',
                select: 'name email',
            })
            .then(sessions=>{
                sessions.forEach(session => {
                    let flag = false;
                    session.users.forEach(user=>{
                        if(user.email === currentUser.email){
                            flag = true;
                        }
                    })
                    if(flag){
                        updatedSessions.push(session);
                    }
                })
            })
        res.status( 201 ).json( updatedSessions );
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

const deleteSession = (req, res, next) => {
    const sessionId = req.query.sessionID;
    Sessions.findByIdAndDelete(sessionId)
        .then(removed=>{
            res.status( 201 ).json( removed );
        })
        .catch((err)=>{
            if( err.name === 'ValidationError' ){
                err.status = 400;
            }else {
                err.status = 500;
            }
    
            return next( err );
        })
}

module.exports = {
    createSession,
    getActiveSessions,
    getAllSessions,
    deleteSession,
    getInactiveSessions
}