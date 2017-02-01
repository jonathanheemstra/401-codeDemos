'use strict';

// step 85
module.exports = {
  template: require('./upload-pic.html'),
  controller: ['$log', 'picService', UploadPicController],
  controllerAs: 'uploadPicCtrl',
  bindings: {
    gallery: '<'
  }
};

// step 86
function UploadPicController($log, picService) {
  $log.debug('UploadPicController');

  this.pic = {};

  // step 87
  this.uploadPic = function() {
    picService.UploadGalleryPic(this.gallery, this.pic)
    .then( () => {
      this.pic.name = null;
      this.pic.desc = null;
      this.pic.file = null;
    });
  };
  
}
