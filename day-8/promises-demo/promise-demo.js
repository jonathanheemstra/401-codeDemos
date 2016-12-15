'use strict';

function bigNumber(number) {
  return new Promise(function(resolve, reject) {
    if(number < 100) {
      reject(new Error('Expected a big number'));
    }
    if(number > 100) {
      return resolve(number);
    }
  });
}

function success(result) {
  console.log('Return .then() result==========\r\n', result, '\r\n\r\n');
}

function throwError(error) {
  console.log('Return .catch() error==========\r\n', error, '\r\n\r\n');
}

console.log('Return new Promise Obj==========\r\n', bigNumber(200), '\r\n\r\n');
bigNumber(200).then(success).catch(throwError);
bigNumber(10).then(success).catch(throwError);
