'use strict';

var array = [0,2,3,4,5,1];

function indexOf(x) {
  for (var i = 0; i < array.length; i++) {
    if(x === array[i]) {
      return i;
    }
  }
  return -1;
}

console.log(indexOf(7));
console.log(indexOf(2));
console.log(indexOf(0));
console.log(indexOf(8));
