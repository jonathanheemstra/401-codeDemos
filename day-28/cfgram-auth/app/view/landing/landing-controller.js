'use strict';

// step 52
// require('./_landing.scss');

module.exports = ['$log', '$location', 'authService', LandingController];

function LandingController($log, $location, authService) {
  $log.debug('LandingController');

  // step 53
  let url = $location.url();
  this.showSignup = url === '/join#signup' || url === '/join';
}
