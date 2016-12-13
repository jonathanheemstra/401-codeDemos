'use strict';

// organizing your application dependencies and logic requires should be in the following order
// 1 - any native node modules
// 2 - npm modules
// 3 - custom app modules (i.e. module exports from our app)
// 4 - module constants
// 5 - module logic

// fs docs: https://nodejs.org/api/fs.html
const fs = require('fs');

// fs.readFile docs: https://nodejs.org/api/fs.html#fs_fs_readfile_file_options_callback
// what we are doing is going to the data file and read the file. FYI: __dirname = home directory
// the readFile will read the 'data' into a buffer and you can set that to whatever encoding you want as the optional second parameter
fs.readFile(`${__dirname}/data/data.txt`, function(err, data) {
  if(err) throw err;
  console.log('content - 1:', data.toString());
  console.log('content - 2:', data);
});

fs.readFile(`${__dirname}/data/data.txt`, 'utf8',function(err, data) {
  if(err) throw err;
  console.log('content - 3:', data.toString());
  console.log('content - 4:', data);
});
