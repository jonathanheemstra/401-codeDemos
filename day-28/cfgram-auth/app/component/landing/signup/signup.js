'use strict';

// step 40
// require('./_signup.scss');

module.exports = {
  template: require('./signup.html'),
  controller: ['$log', '$location', 'authService', SignupController],
  controllerAs: 'signupCtrl'
};

// step 41
function SignupController($log, $location, authService) {
  $log.debug('SignupController');

  // step 42
  authService.getToken()
  .then( () => {
    $location.url('/home');
  });

  // step 43
  this.signup = function(user) {
    $log.debug('signupCtrl.signup()');

    authService.signup(user)
    .then( () => {
      $location.url('/home');
    });
  };

}
