'use strict';

// step 7
const createError = require('http-errors');
const debug = require('debug')('cfgram:basic-auth-middleware');

// step 8
module.exports = function(req, res, next) {
  debug('auth');

  // step 9
  var authHeader = req.headers.authorization;
  debug('auth:authHeader', authHeader);
  if(!authHeader) {
    debug('auth:!authHeader');
    return next(createError(401, 'authorizaiton header required'));
  }

  // step 10
  var base64str = authHeader.split('Basic ')[1];
  debug('auth:base64str', base64str);
  if(!base64str) {
    debug('auth:!base64str');
    return next(createError(401, 'user name and password required'));
  }

  // step 11
  var utf8str = new Buffer(base64str, 'base64').toString();
  debug('auth:utf8str', utf8str);
  var authArr = utf8str.split(':');
  debug('auth:authArr', authArr);

  // step 12
  req.auth = {
    username: authArr[0],
    password: authArr[1]
  };
  debug('auth:req.auth', req.auth);

  // step 13
  if(!req.auth.username) {
    debug('auth:!req.auth.username');
    return next(createError(401, 'requires user name'));
  }

  // step 14
  if(!req.auth.password) {
    debug('auth:!req.auth.password');
    return next(createError(401, 'requires password'));
  }

  // step 15
  next();
};
