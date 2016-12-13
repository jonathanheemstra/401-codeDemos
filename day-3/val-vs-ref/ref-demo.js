'use strict';

// objects are passed by reference. meaning there is a reference to the original object when you pass it through a function
const course = {
  title: 'code 401 js',
  instructor: 'brian'
};

logger(course);

console.log('course:', course);

function logger(c) {
  c.title = 'Code 401 Python';
  console.log('logger:', c);
}
