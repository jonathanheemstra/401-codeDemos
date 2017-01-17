'use strict';

// step 97
const AWS = require('aws-sdk-mock');

// step 98
module.exports = exports = {};

exports.uploadMock = {
  Etag: '1234abcd',
  Location: 'http://mockurl.com/mock.png',
  Key: '1234.png',
  key: '1234.png',
  Bucket: 'cfgram-jonny'
};

// step 99
AWS.mock('S3', 'upload', function(params, callback) {
  if(!params.ACL === 'public-read') {
    return callback(new Error('ACL must be public-read'));
  }
  if(!params.Bucket === 'cfgram-jonny') {
    return callback(new Error('Bucket must be cfgram'));
  }
  if(!params.Key) {
    return callback(new Error('Key required'));
  }
  if(!params.body) {
    return callback(new Error('Body required'));
  }

  callback(null, exports.uploadMock);
});
