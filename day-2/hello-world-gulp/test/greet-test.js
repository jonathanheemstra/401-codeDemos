'use strict';

// single . = relative to where I am at now. double .. = take me up one level from where I am now
const greet = require('../lib/greet.js');
// need to add .expect to end of require statement in order to bring in expect function.
const expect = require('chai').expect;

describe('Greet', function() {
  describe('#sayHey', function() {
    it('should return hey jonny!', function() {
      var name = greet.sayHey('jonny');
      expect(greet).to.have.property('sayHey');
      expect(name).to.equal('hey jonny!');
    });
    // this is a test to test if the test even run
    it('should throw a missing name error', function() {
      var name = greet.sayHey;
      expect(name).to.throw(Error);
    });
  });

  describe('#sayBye', function() {
    it('should return see ya later!', function() {
      var bye = 'see ya later!';
      assert.ok(bye === 'see ya later!', 'not equal to see ya later!');
    });
  });
});
