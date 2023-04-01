const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const User = mongoose.model('User');

const { AUTH_COOKIE, AUTH_VALIDITY } = require('../utils/constant');
const JWT_SECRET = process.env.JWT_SECRET;
const NODE_ENV = process.env.NODE_ENV;
const PORT = process.env.PORT;
const DOMAIN =
  NODE_ENV === 'development' ? `localhost:${PORT}` : 'doodle-backend';

console.log('Domain from env', DOMAIN);
const register = (req, res, next) => {
  const user = req.body;

  if (!user) {
    const error = new Error('User details not sent in request body');
    next(error);
    return;
  }

  User.create(user)
    .then((updatedUser) => {
      res.status(201).json({
        email: updatedUser.email,
        name: updatedUser.name,
      });
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

const login = (req, res, next) => {
  const u = req.body;

  if (!u) {
    const error = new Error('Login details not sent in request body');
    next(error);
    return;
  }

  if (!u.email || !u.password) {
    const error = new Error('Login details not sent in request body');
    next(error);
    return;
  }

  User.findOne({ email: u.email })
    .then((user) => {
      if (!user) {
        const error = new Error('No matching credentials');
        error.status = 404;
        return next(error);
      }
      user.checkPassword(u.password, (err, isMatch) => {
        if (err) {
          const error = new Error('No matching credentials');
          error.status = 404;
          return next(error);
        }

        if (!isMatch) {
          const error = new Error('No matching credentials');
          error.status = 404;
          return next(error);
        }

        // generate the token
        const payload = {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
          role: user.role,
          exp: Date.now() / 1000 + AUTH_VALIDITY,
        };

        jwt.sign(
          payload,
          JWT_SECRET,
          (err, token) => {
            if (err) {
              err.status = 500;
              return next(err);
            }

            res.cookie(AUTH_COOKIE, token, {
              domain: `.${DOMAIN}`,
              expires: new Date(payload.exp * 1000), // s to ms
              httpOnly: true,
            });

            res.json({
              name: user.name,
              email: user.email,
              token: token,
            });
          }
        );
      });
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
  register,
  login,
};
