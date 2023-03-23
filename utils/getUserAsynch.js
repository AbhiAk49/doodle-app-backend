const mongoose = require('mongoose')
const Users = mongoose.model('User')

const getUserAsynch = async (user) => {
    const founduser = await Users.findOne({
        email: user.email,
    })

    if (!founduser) {
        throw new NotFoundError(`User NOT_FOUND`)
    } else {
        return founduser
    }
}

const getAddedUsersAsynch = async (usersArray) => {
    const users = await Users.find({
        name: { $in: usersArray },
    })

    if (!users) {
        throw new NotFoundError(`User NOT_FOUND`)
    } else {
        return users
    }
}

module.exports = { getUserAsynch, getAddedUsersAsynch }
