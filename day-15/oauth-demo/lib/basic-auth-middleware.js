'use strict';

// step 7
const createError = require('http-errors');
const debug = require('debug')('cfgram:basic-auth-middleware');

// step 8
module.exports = function(req, res, next) {
  debug();

  // step 9
  var authHeader = req.headers.authorization;
  if(!authHeader) {
    return next(createError(401, 'authorizaiton header required'));
  }

  // step 10
  var base64str = authHeader.split('Basic ')[1];
  if(!base64str) {
    return next(createError(401, 'user name and password required'));
  }

  // step 11
  var utf8str = new Buffer(base64str, 'base64').toString();
  var authArr = utf8str.split(':');

  // step 12
  req.auth = {
    username: authArr[0],
    password: authArr[1]
  };

  // step 13
  if(!req.auth.username) {
    return next(createError(401, 'requires user name'));
  }

  // step 14
  if(!req.auth.password) {
    return next(createError(401, 'requires password'));
  }

  // step 15
  next();
};
