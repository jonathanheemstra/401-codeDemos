'use strict';

// step 20
require('./home.scss');

// step 21
module.exports = ['$log', HomeController];

// step 22
function HomeController($log) {
  $log.debug('HomeController');

  this.title = 'welcome to the homepage';
}
