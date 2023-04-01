const mongoose = require('mongoose');
const moment = require('moment');
const Sessions = mongoose.model('Sessions');
const Doodle = mongoose.model('Doodle');

const createDoodle = async (req, res, next) => {
  const user = req.user;
  let title = req.body.title;
  let sessionId = req.body.sessionId;
  let base64 = req.body.base64;
  try {
    const session = await Sessions.findByIdAndUpdate(sessionId, {
      currentlyActive: false,
    });
    if (title === '') {
      title = session.date;
    }
    const doodle = {
      title,
      time: session.time,
      date: session.date,
      users: session.users,
      img64: base64,
    };

    const createdDoodle = await Doodle.create(doodle);
    res.status(201).json(createdDoodle);
  } catch (err) {
    if (err.name === 'ValidationError') {
      err.status = 400;
    } else {
      err.status = 500;
    }

    return next(err);
  }
};
const getDoodles = async (req, res, next) => {
  const user = req.user;
  let updatedDoodle = [];
  try {
    updatedDoodle = await Doodle.find({ users: { $in: user._id } })
      .populate({
        path: 'users',
        select: 'name email',
      })
    res.status(200).json(updatedDoodle);
  } catch (err) {
    if (err.name === 'ValidationError') {
      err.status = 400;
    } else {
      err.status = 500;
    }

    return next(err);
  }
};

const deleteDoodle = (req, res, next) => {
  const doodleID = req.query.doodleID;
  Doodle.findByIdAndDelete(doodleID)
    .then((removed) => {
      res.status(200).json(removed);
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
  createDoodle,
  getDoodles,
  deleteDoodle,
};
