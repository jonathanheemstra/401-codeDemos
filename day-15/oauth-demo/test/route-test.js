'use strict';

// step 37
const expect = require('chai').expect;
const request = require('superagent');
const mongoose = require('mongoose');
const Promise = require('bluebird');
const User = require('../model/user.js');

require('../server.js');

// step 38
mongoose.Promise = Promise;

// step 39
const url = `http://localhost:${process.env.PORT}`;

// step 40
const exampleUser = {
  username: 'example_user',
  password: '12345',
  email: 'exampleuser@test.com'
};

// step 41
describe('Auth Routes', function() {
  describe('POST: /api/signup', function() {
    describe('Valid Body', function() {
      after( done => {
        User.remove({})
          .then( () => done())
          .catch(done);
      });

      it('should return a token', done => {
        request.post(`${url}/api/signup`)
          .send(exampleUser)
          .end((err, res) => {
            if(err) return done(err);
            expect(res.status).to.equal(200);
            expect(res.text).to.be.a('string');
            done();
          });
      });
    });
  });

  // step 42
  describe('GET: /api/signin', function() {
    describe('Valid Body', function() {
      before( done => {
        let user = new User(exampleUser);
        user.generatePasswordHash(exampleUser.password)
          .then( user => user.save())
          .then( user => {
            this.tempUser = user;
            done();
          })
          .catch(done);
      });
      after( done => {
        User.remove({})
          .then( () => done())
          .catch(done);
      });

      it('should return a token', done => {
        request.get(`${url}/api/signin`)
          .auth('example_user', '12345')
          .end((err, res) => {
            if(err) return done(err);
            expect(res.status).to.equal(200);
            done();
          });
      });
    });
  });
});
