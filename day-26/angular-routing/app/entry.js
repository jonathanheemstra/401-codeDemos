'use strict';

// step 9
require('./scss/reset.scss');
require('./scss/main.scss');

// step 10
const path = require('path');
const camelcase = require('camelcase');
const pascalcase = require('pascalcase');
const angular = require('angular');
const uiRouter = require('angular-ui-router');

// step 11
const routesApp = angular.module('routesApp', [uiRouter]);

// step 12 - https://webpack.github.io/docs/context.html#context-module-api
let context = require.context('./config/', true, /\.js$/);

// step 13
context.keys().forEach( key => {
  routesApp.config(context(key));
});

// step 14
context = require.context('./view/', true, /\.js$/);

// step 15
context.keys().forEach( key => {
  let name = pascalcase(path.basename(key, '.js'));
  routesApp.controller(name, context(key));
});
