const mongoose = require('mongoose');
const Users = mongoose.model('User');

const getUserByEmail = async (user) => {
  const founduser = await Users.findOne({
    email: user.email,
  });

  if (!founduser) {
    throw new Error(`User NOT_FOUND`);
  } else {
    return founduser;
  }
};

const getAddedUsers = async (usersArray) => {
  const users = await Users.find({
    name: { $in: usersArray },
  });

  if (!users) {
    throw new Error(`User NOT_FOUND`);
  } else {
    return users;
  }
};

module.exports = { getUserByEmail, getAddedUsers };
