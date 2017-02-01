'use strict';

// step 76
module.exports = {
  template: require('./gallery-item.html'),
  controller: ['$log', 'galleryService', GalleryItemController],
  controllerAs: 'galleryItemCtrl',
  bindings: {
    gallery: '<'
  }
};

// step 77
function GalleryItemController($log, galleryService) {
  $log.debug('GalleryItemController');

  this.showEditGallery = false;

  this.deleteGallery = function() {
    galleryService.deleteGallery(this.gallery._id);
  };
}
