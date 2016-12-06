'use strict';

// single . = relative to where I am at now. double .. = take me up one level from where I am now
const greet = require('../lib/greet.js');
const assert = require('assert');

describe('Greet Module', function() {
  describe('#sayHey', function() {
    it('should return hey jonny!', function() {
      var name = greet.sayHey('jonny');
      assert.ok(name === 'hey jonny!', 'not equal to hey jonny!');
    });
    // this is a test to test if the test even run
    it('should throw a missing name error', function() {
      assert.throws(function() {
        greet.sayHey();
      }, 'error not thrown');
    });
  });

  describe('#sayBye', function() {
    it('should return see ya later!', function() {
      var bye = 'see ya later!';
      assert.ok(bye === 'see ya later!', 'not equal to see ya later!');
    });
  });
});
