'use strict';

// step 67
const debug = require('debug')('cfgram:server-control');

// step 68
module.exports = exports = {};

// step 69
exports.serverOn = function(server, done) {
  if(!server.isRunning) {
    server.listen(process.env.PORT, () => {
      server.isRunning = true;
      debug(`Server Up: ${process.env.PORT}`);
      done();
    });
    return;
  }
  done();
};

// step 70
exports.serverOff = function(server, done) {
  if(server.isRunning) {
    server.close( err => {
      if(err) return done(err);
      server.isRunning = false;
      debug('Server Off');
      done();
    });
    return;
  }
  done();
};
