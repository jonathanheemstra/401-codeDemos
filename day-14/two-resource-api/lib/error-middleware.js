'use strict';

const createError = require('http-errors');
const debug = require('debug')('note:error-middleware');

module.exports = function(err, req, res, next) {
  debug('error middleware');

  console.error('MSG:', err.message);
  console.error('NAME:', err.name);

  if(err.status) {
    debug('error middleware - err.status');

    res.status(err.status).send(err.name);
    next();
    return;
  }

  if(err.name === 'ValidationError') {
    debug('error middleware - validation error');

    err = createError(400, err.message);
    res.status(err.status).send(err.name);
    next();
    return;
  }

  debug('error middleware - server error');
  err = createError(500, err.message);
  res.status(err.status).send(err.name);
  next();
  return;
};
