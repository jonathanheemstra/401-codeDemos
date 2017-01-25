// step 7
const webpackConfig = require('./webpack.config.js');
webpackConfig.enry = {};

module.exports = function(config) {
  config.set({

    // step 8
    webpack: webpackConfig,
    
    basePath: '',
    frameworks: ['jasmine'],
    files: [
      'test/**/*-test.js'
    ],
    exclude: [
    ],
    preprocessors: {
      'test/**/*-test.js': ['webpack']
    },
    reporters: ['progress'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['PhantomJS'],
    singleRun: false,
    concurrency: Infinity
  });
};