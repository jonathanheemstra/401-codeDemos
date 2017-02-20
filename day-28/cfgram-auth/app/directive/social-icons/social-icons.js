'use strict';

// step 101
module.exports = function() {
  return {
    restrict: 'EAC',
    template: require('./social-icons.html'),
    controller: ['$log', SocialIconsController],
    controllerAs: 'socialIconsCtrl',
    bindToController: true,
    scope: {
      title: '@'
    }
  };
};

// step 102
function SocialIconsController($log) {
  $log.debug('SocialIconsController');

  this.icons = ['fb', 'twitter', 'instagram'];
}
