'use strict';

const debug = require('debug')('note:cors');

module.exports = function(req, res, next) {
  debug('cors');

  res.append('Access-Control-Allow-Origin', '*');
  res.append('Access-Control-Allow-Headers', '*');
  next();
};
