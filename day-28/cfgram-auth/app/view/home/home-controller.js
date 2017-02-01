'use strict';

// step 50
// require('./_home.scss');

module.exports = ['$log', '$rootScope', 'galleryService', HomeController];

function HomeController($log, $rootScope, galleryService) {
  $log.debug('HomeController');

  this.title = 'create a new gallery.';

  // step 67
  this.galleries = [];

  // step 68
  this.fetchGalleries = function() {
    galleryService.fetchGalleries()
    .then( galleries => {
      this.galleries = galleries;
      
      // step 97
      this.currentGallery = galleries[0];
    });
  };

  // step 96
  this.galleryDeleteDone = function(gallery) {
    if(this.currentGallery._id === gallery._id) {
      this.currentGallery = null;
    }
  };

  // step 69
  this.fetchGalleries();

  // step 70
  $rootScope.$on('$locationChangeSuccess', () => {
    this.fetchGalleries();
  });
}
