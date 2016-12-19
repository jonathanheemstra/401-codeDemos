'use strict';

var fs = require('fs');

fs.readdir(process.argv[2], function(err, list) {
  if(err) throw err;
  var type = process.argv[3];
  for(var i = 0; i < list.length; i++) {
    if(list[i] === process.argv[3]) console.log(list[i]);
  }
});
