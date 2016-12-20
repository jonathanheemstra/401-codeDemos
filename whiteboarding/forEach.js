'use strict';

let array = [0,1,2,3];
let myArry = [0,1,2,3];

function forEachAlt(array, callback) {
  for (var i = 0; i < array.length; i++) {
    array[i] = callback(array[i]);
  }
  return array;
}

function callback(array) {
  console.log(array * 2);
}

forEachAlt(array, callback);

console.log('array', array);


Array.prototype.forEach = function(func) {
  for (var i = 0; i < this.length; i++) {
    func(this[i]);
  }
  return this;
};


myArry.forEach(function(element) {
  return element *= 2;
});

console.log(myArry);

array.forEach(callback);
