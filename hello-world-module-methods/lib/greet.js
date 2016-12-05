'use strict';

// available on node module - we need to set up exports to be an empty object so that we can add methods to it later (i.e. below)
module.exports = exports = {};

// arguments is a reserved word that references the arguments provided in the function
exports.sayHey = function(name) {
  // single line if statements can be put in one line instead of using bracets to block it out
  if(arguments.length === 0) throw new Error('name not provided');
  // ${...} = string interpolation to work requires back ticks. Can accept expressions as well.
  console.log(`hey ${name}!`);
};

exports.sayBye = function() {
  console.log('see ya later!');
};
