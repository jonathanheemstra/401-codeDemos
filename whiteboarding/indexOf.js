'use strict';

var arrayOfNums = [0, 2, 3, 4, 5, 1];
var arrayOfStrings = ['a', 'b', 'c', 'd', 'e'];


function indexOf(x, array) {
  for (var i = 0; i < array.length; i++) {
    if(x === array[i]) {
      return i;
    }
  }
  return -1;
}

console.log(indexOf(3, arrayOfNums));
console.log(indexOf(7, arrayOfNums));
console.log(indexOf('b', arrayOfStrings));
console.log(indexOf('f', arrayOfStrings));
