'use strict';

var fs = require('fs');

fs.readdir(process.argv[2], function(err, list) {
  if(err) throw err;
  var type = process.argv[3];
  list.split('.');
  console.log(list);
});
