'use strict';

// step 45
// require('./_login.scss');

module.exports = {
  template: require('./login.html'),
  controller: ['$log', '$location', 'authService', LoginController],
  controllerAs: 'loginCtrl'
};

// step 46
function LoginController($log, $location, authService) {
  $log.debug('LoginController');

  // step 47
  authService.getToken()
  .then( () => {
    $location.url('/home');
  });

  // step 48
  this.login = function() {
    $log.log('loginCtrl.login()');

    authService.login(this.user)
    .then( () => {
      $location.url('/home');
    });
  };

}
