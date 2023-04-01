const mongoose = require('mongoose');
const Sessions = mongoose.model('Sessions');
const Users = mongoose.model('User');
const formatSession = require('../utils/formatSession');
const { getUserByEmail, getAddedUsers } = require('../utils/getUsers');
const createSession = async (req, res, next) => {
  let users = req.body;
  const user = req.user;
  let SessionInitailize = formatSession();
  try {
    //const foundUser = await getUserByEmail(currentUser);
    const addedUsers = await getAddedUsers(users);
    const newSession = await Sessions.create(SessionInitailize);
    newSession.users.push(user._id);
    addedUsers.forEach((user) => newSession.users.push(user._id));
    const updatedSession = await Sessions.findOneAndUpdate(
      { _id: newSession._id },
      newSession
    );
    res.status(201).json(updatedSession);
  } catch (err) {
    if (err.name === 'ValidationError') {
      err.status = 400;
    } else {
      err.status = 500;
    }

    return next(err);
  }
};

const getAllSessions = async (req, res, next) => {
  try {
    const totalSessions = await Sessions.find({}).populate({
      path: 'users',
      select: 'name email',
    });
    res.status(200).json(totalSessions);
  } catch (err) {
    if (err.name === 'ValidationError') {
      err.status = 400;
    } else {
      err.status = 500;
    }

    return next(err);
  }
};

const getActiveSessions = async (req, res, next) => {
  const user = req.user;
  let updatedSessions = [];
  try {
    updatedSessions = await Sessions.find({
      users: { $in: user._id },
      currentlyActive: true,
    }).populate({
      path: 'users',
      select: 'name email',
    });
    res.status(200).json(updatedSessions);
  } catch (err) {
    if (err.name === 'ValidationError') {
      err.status = 400;
    } else {
      err.status = 500;
    }

    return next(err);
  }
};
const getInactiveSessions = async (req, res, next) => {
  const user = req.user;
  let updatedSessions = [];
  try {
    updatedSessions = await Sessions.find({
      users: { $in: user._id },
      currentlyActive: false,
    }).populate({
      path: 'users',
      select: 'name email',
    });
    res.status(200).json(updatedSessions);
  } catch (err) {
    if (err.name === 'ValidationError') {
      err.status = 400;
    } else {
      err.status = 500;
    }

    return next(err);
  }
};

const deleteSession = (req, res, next) => {
  const sessionId = req.query.sessionID;
  Sessions.findByIdAndDelete(sessionId)
    .then((removed) => {
      res.status(201).json(removed);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        err.status = 400;
      } else {
        err.status = 500;
      }

      return next(err);
    });
};

module.exports = {
  createSession,
  getActiveSessions,
  getAllSessions,
  deleteSession,
  getInactiveSessions,
};
