'use strict';

// step 16
module.exports = ['$stateProvider', '$urlRouterProvider', routerConfig];

// step 17
function routerConfig($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.when('', '/home');

// step 18
  let routes = [
    {
      name: 'home',
      url: '/home',
      template: require('../view/home/home.html'),
      controller: 'HomeController',
      controllerAs: 'homeCtrl'
    },
    {
      name: 'signup',
      url: '/signup',
      template: require('../view/signup/signup.html'),
      controller: 'SignupController',
      controllerAs: 'signupCtrl'
    }
  ];

// step 19
  routes.forEach( route => {
    $stateProvider.state(route);
  });
}
