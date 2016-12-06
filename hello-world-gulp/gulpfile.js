'use strict';

// brings in the gulp module
const gulp = require('gulp');
// https://www.npmjs.com/package/gulp-eslint
const eslint = require('gulp-eslint');
// https://www.npmjs.com/package/gulp-mocha or https://github.com/sindresorhus/gulp-mocha
const mocha = require('gulp-mocha');

gulp.task('test', function() {
  // looking for file in the test directory that has a file name of *-test
  gulp.src('./test/*-test.js', { read: false })
      .pipe(mocha({ reporter: 'spec' }));
});

gulp.task('lint', function() {
  return gulp.src(['**/*.js', '!node_modules'])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

gulp.task('dev', function() {
  gulp.watch(['**/*.js', '!node_modules'], ['lint','test']);
});

gulp.task('default', ['dev']);
