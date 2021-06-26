require( './data/init' )
const mongoose = require('mongoose');
const cors = require('cors'); 
const express = require( 'express' );
const http  = require('http');
const socketio = require('socket.io');
const Users = mongoose.model('User');
const authRouter = require( './routes/auth' );
const usersRouter = require( './routes/users' );
const sessionsRouter = require('./routes/sessions');
const { pageNotFoundHandler, errorHandler } = require( './middleware/error-handlers' );
const PORT = process.env.PORT || 3000;
// const ALLOWED_ORIGINS = [
//     `http://localhost:${PORT}`
//   ]
const app = express();
const server = http.createServer(app);
const io = socketio(server);
app.use(cors());
app.use( express.json() );

app.use( express.urlencoded( { extended: false } ) );

server.listen( PORT, error => {
    if( error ) {
        return console.error( error.message );
    }
    console.log( `Server running on ${PORT}` )
} );

io.on('connection',(socket)=>{

    socket.on('subscribe',async (room,user) => {
        try{
            const foundUser = await Users.findOne({email:user}).select('email name');
            console.log(`${foundUser.name} joined!`);
            socket.join(room);
            socket.in(room).emit('user-join',room,foundUser);
            //socket.emit('startSession','New session started!');
            //socket.broadcast.emit('userJoined',`Socket ${socket.id} connected`)
        }
        catch(err){
            console.log(err);
        }
    });
    socket.on('canvas-data',(room,data) =>{
            socket.in(room).emit('canvas-data',room,data);
        //socket.to(room).emit('sync-data',data);
    });
    socket.on('canvas-clear',(room) => {
        socket.in(room).emit('canvas-clear',room);
    });
    socket.on('leave',async(room,user) => {
        try{
            const userLeave = await Users.findOne({email:user}).select('email name');
            socket.leave(room);
            socket.in(room).emit('user-left',room,userLeave);
            console.log(`${userLeave.name} left.`);
        }
        catch(err){
            console.log(err);
        }
    });
    // socket.on('disconnect', () => {
    //     console.log(`${socket.id} disconnected`);
    // });
});

app.use( '/auth', authRouter );
app.use( '/users', usersRouter );
app.use('/sessions',sessionsRouter);

app.use( pageNotFoundHandler );
app.use( errorHandler );