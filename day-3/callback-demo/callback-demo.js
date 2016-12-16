'use strict';

// standard callback pattern
var someCallback = function(data) {
  console.log('got some data:', data);
};

var useCallback = function(cb) {
  console.log('cd ========\r\n', cb);
  cb('the data that I wanted to get');
};

useCallback(someCallback);

/*
==============
==============
*/

// error first call back pattern without error
// var someCallback = function(err, data) {
//   if(err) throw err;
//   console.log('got some data:', data);
// };
//
// var useCallback = function(cb) {
//   // null is the value that is passed as the err parameter
//   cb(null, 'the data that I wanted to get');
// };

// useCallback(someCallback);

/*
==============
==============
*/

// error first call back patter with error
// var someCallback = function(err, data) {
//   if(err) throw err;
//   console.log('got some data:', data);
// };
//
// var useCallback = function(cb) {
//   var sampleError = new Error('throwing a sample error');
//   cb(sampleError, 'the data that I wanted to get');
// };

// useCallback(someCallback);
