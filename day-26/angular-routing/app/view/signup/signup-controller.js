'use strict';

// step 24
require('./signup.scss');

// step 25
module.exports = ['$log', SignupController];

// step 26
function SignupController($log) {
  $log.debug('SignupController');

  this.title = 'Welcome to the signup page';
}
