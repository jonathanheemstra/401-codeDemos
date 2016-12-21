'use strict';

let array = [0,1,2,3];

function forEachAlt(array, callback) {
  for (var i = 0; i < array.length; i++) {
    console.log(callback(array[i]));
  }
}

function callback(arrayValue) {
  return arrayValue * 2;
}

forEachAlt(array, callback);
