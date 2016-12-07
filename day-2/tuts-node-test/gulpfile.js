'use strict';

const gulp = require('gulp');
const mocha = require('gulp-mocha');
const eslint = require('gulp-eslint');
const istanbul = require('gulp-istanbul');

gulp.task('pre-test', function() {
  return gulp.src(['./lib/*.js', '!node_modules/**', '!coverage/**'])
    .pipe(istanbul())
    .pipe(istanbul.hookRequire());
});

gulp.task('test', function() {
  gulp.src('./test/*.js', {read:false})
    .pipe(mocha({reporter: 'nyan'}))
    .pipe(istanbul.writeReports())
    .pipe(istanbul.enforceThresholds({thresholds: {global: 90}}));
});

gulp.task('lint', function() {
  gulp.src(['**/*.js', '!node_modules/**', '!coverage/**'])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});



gulp.task('dev', function() {
  gulp.watch(['**/*.js', '!node_modules/**'], ['pre-test', 'test', 'lint']);
});

gulp.task('default', ['dev']);
