'use strict';

// step 29
module.exports = ['$q', '$log', '$http', '$window', authService];

// step 30
function authService($q, $log, $http, $window) {
  $log.debug('authService');

  // step 31
  let service = {};
  let token = null;

  // step 32
  function setToken(_token) {
    $log.debug('authService.setToken');

    if(!_token) return $q.reject(new Error('no token'));

    // step 33 - setting the token into localStorage with the property of token and the value from _token.
    $window.localStorage.setItem('token', _token);
    token = _token;
    return $q.resolve(token);
  }

  // step 34
  service.getToken = function() {
    $log.debug('authService.getToken()');

    if(token) return $q.resolve(token);

    token = $window.localStorage.getItem('token');
    if(token) return $q.resolve(token);
    return $q.reject(new Error('token not found'));
  };

  // step 35
  service.logout = function() {
    $log.debug('authService.logout()');

    $window.localStorage.removeItem('token');
    token = null;
    return $q.resolve();
  };

  // step 36
  service.signup = function(user) {
    $log.debug('authService.signup()');

    let url = `${__API_URL__}/api/signup`;
    let config = {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    };

    // step 37
    return $http.post(url, user, config)
    .then( res => {
      $log.log('success', res.data);
      return setToken(res.data);
    })
    .catch( err => {
      $log.error('failed', err.message);
      return $q.reject(err);
    });
  };

  // step 38
  service.login = function(user) {
    $log.debug('authService.login()');

    let url = `${__API_URL__}/api/login`;
    let base64 = $window.btoa(`${user.username}:${user.password}`);
    let config = {
      headers: {
        Accept: 'application/json',
        Authorization: `Basic ${base64}`
      }
    };

    // step 39
    return $http.get(url, config)
    .then( res => {
      $log.log('success', res.data);
      return setToken(res.data);
    })
    .catch( err => {
      $log.error(err.message);
      return $q.reject(err);
    });
  };

  return service;

}
