'use strict';

// step 27
module.exports = ['$logProvider', logConfig];

// step 28
function logConfig($logProvider) {
  $logProvider.debugEnabled(__DEBUG__);
}
