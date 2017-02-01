'use strict';

// step 61
// require('./_create-gallery.scss');

module.exports = {
  template: require('./create-gallery.html'),
  controller: ['$log', 'galleryService', CreateGalleryController],
  controllerAs: 'createGalleryCtrl'
};

// step 62
function CreateGalleryController($log, galleryService) {
  $log.debug('CreateGalleryController');

  // step 63
  this.gallery = {};

  // step 64
  this.createGallery = function() {
    galleryService.createGallery(this.gallery)
    .then( () => {
      this.gallery.name = null;
      this.gallery.desc = null;
    });
  };
}
