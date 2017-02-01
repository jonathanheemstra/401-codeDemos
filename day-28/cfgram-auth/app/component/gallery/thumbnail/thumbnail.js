'use strict';

// step 90
module.exports = {
  template: require('./thumbnail.html'),
  controller: ['$log', 'picService', ThumbnailController],
  controllerAs: 'thumbnailCtrl',
  bindings: {
    pic: '<'
  }
};

// step 91
function ThumbnailController($log, picService) {
  $log.debug('ThumbnailController');

  this.deletePic = function() {
    $log.ebug('thumbnailCtrl.deletePic()');

    // TODO: build delete pic method
  };
}
