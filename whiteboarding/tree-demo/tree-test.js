'use strict';

const Tree = require('./tree.js');

let a = new Tree('A', [new Tree('B', [new Tree('D')]), new Tree('C')]);

console.assert(a.breadthFirst() == 'A,B,C,D', `The order array was ${a.breadthFirst()}`);

console.log('Hooray! All tests pass!');
