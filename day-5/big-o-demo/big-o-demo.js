'use strict';

// big O notation is O(n). in this situation is n = 4 for but still described as O(n) because the input is variable.

// n of 4
var nums = [1,2,3,4];

// O of n
function contains(input, find) {
  for (var i = 0; i < input.length; i++) {
    if(input[i] === find) return true;
  }
  return false;
}

console.log('contains 4', contains(nums, 4));
console.log('contains 5', contains(nums, 5));

// big O notation is O(1) because the match function only requires 1 immediate look up.

// n of 5
var colors = {
  red: '#ff0000',
  green: '#00ff00',
  blue: '#0000ff',
  white: '#ffffff',
  black: '#000000'
};

// O of 1  -  O(1)
function match(input, find) {
  if(input[find]) return true;
  return false;
}

console.log('matches red', match(colors, 'red'));
console.log('matches purple', match(colors, 'purple'));

// big O notation anytime there are nested loops it's considered On^2 https://en.wikipedia.org/wiki/Selection_sort

var dates = [
  new Date('03-12-2003'),
  new Date('03-12-1988'),
  new Date('03-12-1990'),
  new Date('03-12-2016'),
  new Date('03-12-2005')
];

// O(n^2)
function selectionSort(array) {
  for (var i = 0; i < array.length; ++i) {
    var minIndex = i;
    for (var j = i + 1; j < array.length; ++j) {
      if (array[j] < array[minIndex]) {
        minIndex = j;
      }
    }
    if (minIndex != i) {
      var temp = array[i];
      array[i] = array[minIndex];
      array[minIndex] = temp;
    }
  }
  return array;
}

console.log('Date', selectionSort(dates));


// sortedNumbers has an n of 13
let sortedNumbers = [2, 5, 7, 10, 22, 23, 26, 32, 45, 67, 73, 84, 92];

function binarySearch(array, find) {
  console.log('cut in half:', array);
  if(array.length == 1) {
    return array[0] === find ? true : false;
  }
  let startIndex = Math.floor(array.length / 2);
  let current = array[startIndex];

  if(current > find) return binarySearch(array.slice(0, startIndex), find);
  if(current < find) return binarySearch(array.slice(startIndex), find);
  return true;
}

console.log('searching for 32:', binarySearch(sortedNumbers, 32));
console.log('searching for 100:', binarySearch(sortedNumbers, 100));
