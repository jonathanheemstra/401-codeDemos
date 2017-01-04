'use strict';

// step 46
const jwt = require('jsonwebtoken');
const createError = require('http-errors');
const debug = require('debug')('cfgram:bearer-auth-middleware');

// step 47
const User = require('../model/user.js');

// step 48
module.exports = function(req, res, next) {
  debug('bearer-auth-middleware');

  // step 49
  var authHeader = req.headers.authorization;
  debug('bearer-auth-middleware:authHeader', authHeader);
  if(!authHeader) {
    debug('bearer-auth-middleware:!authHeader');
    return next(createError(401, 'authorization header required'));
  }

  // step 50
  var token = authHeader.split('Bearer ')[1];
  debug('bearer-auth-middleware:token', token);
  if(!token) {
    debug('bearer-auth-middleware:!token');
    return next(createError(401, 'token required'));
  }

  // step 51
  jwt.verify(token, process.env.APP_SECRET, (err, decoded) => {
    debug('bearer-auth-middleware:jwt.verify');
    if(err) return next(err);

    User.findOne({ findHash: decoded.token })
      .then( user => {
        debug('bearer-auth-middleware:jwt.verify:findOne:then.user');
        req.user = user;
        return next();
      })
      .catch( err => {
        debug('bearer-auth-middleware:jwt.verify:findOne:catch');
        return next(createError(401, err.message));
      });
  });
};
