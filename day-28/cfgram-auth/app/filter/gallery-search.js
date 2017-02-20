'use strict';

// step 107
module.exports = function() {
  return function(galleries, searchTerm) {
    let fuzzyRegex = generateFuzzyRegex(searchTerm);
    return galleries.filter(gallery => {
      return fuzzyRegex.test(gallery.name.toUpperCase());
    });
  };
};

// step 108
function generateFuzzyRegex(input) {
  if(!input) return /.*/;

  let fuzzyString = '.*' + input.toUpperCase().split('').join('.*') + '.*';
  return new RegExp(fuzzyString);
}
