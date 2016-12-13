'use strict';

// variables that are simple types that are passed by value and not by reference.
const num = 1;

logger(num);

console.log('num:', num);

function logger(num) {
  num += 1;
  console.log('logger', num);
}
