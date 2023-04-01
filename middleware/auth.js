const jwt = require('jsonwebtoken');
const ExtractJwt = require('passport-jwt').ExtractJwt;
const { AUTH_COOKIE, AUTH_VALIDITY } = require('../utils/constant');
const jwt_secret = process.env.JWT_SECRET;
const mongoose = require('mongoose');
const User = mongoose.model('User');

const tokenExtractor = function (req, key = AUTH_COOKIE) {
  let token = null;
  const bearerToken = ExtractJwt.fromAuthHeaderAsBearerToken()(req);
  if (bearerToken) {
    token = bearerToken;
  } else if (req?.cookies) {
    token = req.cookies[key];
  }
  return token;
};

const authenticate = (req, res, next) => {
  const token = tokenExtractor(req);

  if (!token) {
    const error = new Error('Go away intruder');
    error.status = 401;
    return next(error);
  }

  jwt.verify(token, jwt_secret, async (err, claims) => {
    if (err) {
      const error = new Error('Go away intruder');
      error.status = 403;
      return next(error);
    }
    const { id } = claims;
    const user = await User.findById(id);
    if (!user) {
      const error = new Error('Go away intruder');
      error.status = 403;
      return next(error);
    }
    req.user = user;
    next();
  });
};

module.exports = authenticate;
