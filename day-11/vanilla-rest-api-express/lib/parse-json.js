'use strict';

module.exports = function(req) {
  // when you return a promise it is returning an object not a specific piece of data
  return new Promise( (resolve, reject) => {
    // req is an object.
    if(req.method === 'POST' || req.method === 'PUT') {
      var body = '';

      //
      req.on('data', data => {
        body += data.toString();
      });

      req.on('end', () => {
        try {
          req.body = JSON.parse(body);
          resolve(req);
        } catch(err) {
          console.error(err);
          reject(err);
        }
      });

      req.on('error', err => {
        console.error(err);
        reject(err);
      });

      return;
    }

    // handles anything other than a post or put request
    resolve();
  });
};
