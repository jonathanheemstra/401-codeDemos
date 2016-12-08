'use string';

const fs = require('fs');

fs.readFile(`${__dirname}/data/data.txt`, function(err, data){
  if(err) throw err;
  console.log('content of original file:', data.toString());

  // https://nodejs.org/api/fs.html#fs_fs_writefile_file_data_options_callback
  // data = a buffer that is created in the readFile
  fs.writeFile(`${__dirname}/data/new-data.txt`, data, function(err, data) {
    if(err) throw err;
    console.log('write file msg:', 'new file created');
  });
});
