'use strict';

// step 7
const webpack = require('./webpack.config.js');
webpack.entry = {};


module.exports = function(config) {
  config.set({
    // step 8
    webpack,

    basePath: '',

    frameworks: ['jasmine'],

    files: [
      // step 10
      'app/entry.js',
      'test/**/*-test.js',
      'node_modules/angular-mocks/angular-mocks.js'
    ],

    exclude: [
      // possibly could include node_modules here.
    ],

    preprocessors: {
      // step 9
      'test/**/*-test.js': ['webpack'],
      'app/entry.js': ['webpack']
    },

    reporters: ['mocha'],

    port: 9876,

    colors: true,

    logLevel: config.LOG_INFO,

    autoWatch: true,

    browsers: ['PhantomJS'],

    singleRun: false,

    concurrency: Infinity
  });
};
