const mongoose = require('mongoose')

const sessionSchema = new mongoose.Schema({
    time: { type: String, required: true },
    date: { type: String, required: true },
    users: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    currentlyActive: { type: Boolean, default: true },
})

mongoose.model('Sessions', sessionSchema)
