'use strict';

// I am adding a method/function to the exports method (i.e. singleton). this makes it available in other files. This is not something you would do if you have multiple methods
module.exports = function() {
  console.log('hey world');
}
