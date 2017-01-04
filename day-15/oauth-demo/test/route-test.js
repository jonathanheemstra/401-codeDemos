'use strict';

// step 37
const expect = require('chai').expect;
const request = require('superagent');
const mongoose = require('mongoose');
const Promise = require('bluebird');
const User = require('../model/user.js');

// step 72
const serverControl = require('./lib/server-control.js');

// step 38
mongoose.Promise = Promise;

// step 73
const server = require('../server.js');

// step 39
// require('../server.js'); - abstracted into ./test/lib/server-control.js
const url = `http://localhost:${process.env.PORT}`;

// step 40
const exampleUser = {
  username: 'example_user',
  password: '12345',
  email: 'exampleuser@test.com'
};

// step 41
describe('Auth Routes', function() {

  // step 74
  before( done => {
    serverControl.serverOn(server, done);
  });
  after( done => {
    serverControl.serverOff(server, done);
  });

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
