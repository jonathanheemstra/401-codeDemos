'use strict';

// provides access to the module.export object. This provides a short hand for saying module.exports.sayHey or module.exports.sayBye
const greet = require('./lib/greet.js');

greet.sayHey('jonny');
greet.sayBye();
