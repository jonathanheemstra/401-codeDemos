'use strict';

const fs = require('fs');
const path = require('path');

module.exports = function(dir, ext, callback) {
  var fileExt = '.' + ext;
  fs.readdir(dir, function (err, files) {
    if (err) return callback(err, null);
    let data = [];
    files.forEach(function (file) {
      if (path.extname(file) === fileExt) {
        data.push(file);
      }
    });
    callback(null, data);
  });
};

// BEST PRACTICE

// var fs = require('fs');
// var path = require('path');
//
// module.exports = function (dir, filterStr, callback) {
//   fs.readdir(dir, function (err, list) {
//     if (err) {
//       return callback(err);
//     }
//
//     list = list.filter(function (file) {
//       return path.extname(file) === '.' + filterStr;
//     });
//
//     callback(null, list);
//   });
// };
