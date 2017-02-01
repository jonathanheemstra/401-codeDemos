'use strict';

// step 55
module.exports = ['$q', '$log', '$http', 'authService', galleryService];

// step 56
function galleryService($q, $log, $http, authService) {
  $log.debug('galleryService');

  // step 57
  let service = {};
  service.galleries = [];

  // step 58
  service.createGallery = function(gallery) {
    $log.debug('galleryService.createGallery()');

    return authService.getToken()
    .then( token => {
      let url = `${__API_URL__}/api/gallery`;
      let config = {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      };
      return $http.post(url, gallery, config);
    })
    .then( res => {
      $log.log('gallery created');
      let gallery = res.data;
      service.galleries.unshift(gallery);
      return gallery;
    })
    .catch( err => {
      $log.error(err.message);
      return $q.reject(err);
    });
  };


  // step 59
  service.deleteGalleries = function(galleryID, galleryData) {
    $log.debug('galleryService.deleteGalleries()');

    return authService.getToken()
    .then( token => {
      let url = `${__API_URL__}/api/gallery/${galleryID}`;
      let config = {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`
        }
      };
    });
  };

  // step 60
  service.fetchGalleries = function() {
    $log.debug('galleryService.fetchGalleries()');

    return authService.getToken()
    .then( token => {
      let url = `${__API_URL__}/api/gallery`;
      let config = {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`
        }
      };
      return $http.get(url, config);
    })
    .then( res => {
      $log.log('gallries retrieved');
      service.gallries = res.data;
      return service.galleries;
    })
    .catch( err => {
      $log.error(err.message);
      return $q.reject(err);
    });
  };

  // step 71
  service.updateGallery = function(galleryID, galleryData) {
    $log.debug('galleryService.updateGallery()');

    return authService.getToken()
    .then( token => {
      let url = `${__API_URL__}/api/gallery/${galleryID}`;
      let config = {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      };
      return $http.put(url, galleryData, config);
    })
    .then( res => {
      for(let i = 0; i < service.galleries.length; i++) {
        let current = service.galleries[i];
        if(current._id === galleryID) {
          service.galleries[i] = res.data;
          break;
        }
      }
      return res.data;
    })
    .catch( err => {
      $log.error(err.message);
      return $q.reject(err);
    });
  };

  // step 72
  service.deleteGallery = function(galleryID) {
    $log.debug('galleryService.deleteGallery()');

    return authService.getToken()
    .then( token => {
      let url = `${__API_URL__}/api/gallery/${galleryID}`;
      let config = {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      };

      return $http.delete(url, config);
    })
    .then( () => {
      for(let i = 0; i < service.galleries.length; i++) {
        let current = service.galleries[i];
        if(current._id === galleryID) {
          service.galleries.splice(i, 1);
          break;
        }
      }
    })
    .catch( err => {
      $log.error(err.message);
      return $q.reject(err);
    });
  };

  return service;
}
