'use strict';

// run in terminal by typing node index.js - simple node app that doesn't use modularization
console.log('hello world');

// similar to how a <script> tag works in HTML - adds a layer of modularity to the application
const hello = require('./lib/hello.js');
hello();
