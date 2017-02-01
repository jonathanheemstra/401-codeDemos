'use strict';

// step 73
module.exports = {
  template: require('./edit-gallery.html'),
  controller: ['$log', 'galleryService', EditGalleryController],
  controllerAs: 'editGalleryCtrl',
  bindings: {
    gallery: '<'
  }
};

// step 74
function EditGalleryController($log, galleryService) {
  $log.debug('EditGalleryController');

  this.updateGallery = function() {
    galleryService.updateGallery(this.gallery._id, this.gallery);
  };
}
