'use strict';

// step 11
require('./scss/main.scss');

// step 12
const path = require('path');
const angular = require('angular');
const camelcase = require('camelcase');
const pascalcase = require('pascalcase');
const uiRouter = require('angular-ui-router');
const ngTouch = require('angular-touch');
const ngAnimate = require('angular-animate');

// step 98
const ngFileUpload = require('ng-file-upload');

// step 13
const cfgram = angular.module('cfgram', [ngTouch, ngAnimate, uiRouter, ngFileUpload]);

// step 14
let context = require.context('./config/', true, /\.js$/);

// step 15
context.keys().forEach( path => {
  cfgram.config(context(path));
});

// step 16
context = require.context('./view/', true, /\.js$/);

// step 17
context.keys().forEach( key => {
  let name = pascalcase(path.basename(key, '.js'));
  let module = context(key);
  cfgram.controller(name, module);
});

// step 18
context = require.context('./service/', true, /\.js$/);

// step 19
context.keys().forEach( key => {
  let name = camelcase(path.basename(key, '.js'));
  let module = context(key);
  cfgram.service(name, module);
});

// step 20
context = require.context('./component/', true, /\.js$/);

// step 21
context.keys().forEach( key => {
  let name = camelcase(path.basename(key, '.js'));
  let module = context(key);
  cfgram.component(name, module);
});
