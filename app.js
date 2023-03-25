require('dotenv').config()
require('./data/init')
const mongoose = require('mongoose')
const path = require('path')
const cors = require('cors')
const express = require('express')
const http = require('http')
const socketio = require('socket.io')
const Users = mongoose.model('User')
const authRouter = require('./routes/auth')
const usersRouter = require('./routes/users')
const sessionsRouter = require('./routes/sessions')
const doodlesRouter = require('./routes/doodles')
const {
    pageNotFoundHandler,
    errorHandler,
} = require('./middleware/error-handlers')
const PORT = process.env.PORT || 3000
// const ALLOWED_ORIGINS = [
//     `http://localhost:${PORT}`
//   ]
const app = express()
const server = http.createServer(app)
const io = socketio(server)
if (process.env.NODE_ENV === 'development') {
    app.use(cors())
}

app.use(express.static(path.join(process.cwd(), 'public')))

app.use(express.json())

app.use(express.urlencoded({ extended: false }))

server.listen(PORT, (error) => {
    if (error) {
        return console.error(error.message)
    }
    console.log(`Server running on ${PORT}`)
})

io.on('connection', (socket) => {
    socket.on('subscribe', async (room, user) => {
        try {
            const foundUser = await Users.findOne({ email: user }).select(
                'email name'
            )
            console.log(`${foundUser.name} joined!`)
            socket.join(room)
            socket.in(room).emit('user-join', room, foundUser)
        } catch (err) {
            console.log(err)
        }
    })
    socket.on('canvas-data', (room, data) => {
        socket.in(room).emit('canvas-data', room, data)
    })
    socket.on('canvas-clear', (room) => {
        socket.in(room).emit('canvas-clear', room)
    })
    socket.on('leave', async (room, user) => {
        try {
            const userLeave = await Users.findOne({ email: user }).select(
                'email name'
            )
            socket.leave(room)
            socket.in(room).emit('user-left', room, userLeave)
            console.log(`${userLeave.name} left.`)
        } catch (err) {
            console.log(err)
        }
    })
    socket.on('terminate-session', (room) => {
        socket.in(room).emit('terminate-session', room)
    })
})

app.use('/api/auth', authRouter)
app.use('/api/users', usersRouter)
app.use('/api/sessions', sessionsRouter)
app.use('/api/doodles', doodlesRouter)
app.use('/api', pageNotFoundHandler)
app.use('/api', errorHandler)

app.use(function (req, res, next) {
    res.sendFile(path.join(process.cwd(), 'public', 'index.html'))
})
