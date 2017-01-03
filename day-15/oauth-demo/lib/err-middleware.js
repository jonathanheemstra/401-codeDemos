'use strict';

// step 16
const createError = require('http-errors');
const debug = require('debug')('movies:error-middleware');

// step 17
module.exports = function(err, req, res, next) {
  debug('error-middleware');

  // step 18
  if(err.status) {
    debug('user error');

    res.status(err.status).send(err.name);
    next();
    return;
  }

  // step 19
  if(err.name === 'ValidationError') {
    debug('Validation Error');

    err = createError(400, err.message);
    res.status(err.status).send(err.name);
    next();
    return;
  }

  // step 20
  if(err.name === 'CastError') {
    debug('Cast Error');

    err = createError(404, err.message);
    res.status(err.status).send(err.name);
    next();
    return;
  }

  // step 21
  debug('server error');
  err = createError(500, err.message);
  res.status(err.status).send(err.name);
  next();
};
