'use strict';

// step 59
const expect = require('chai').expect;
const request = require('superagent');
const mongoose = require('mongoose');
const Promise = require('bluebird');

// step 75
const serverControl = require('./lib/server-control.js');


// step 60
const User = require('../model/user.js');
const Gallery = require('../model/gallery.js');

// step 61
// require('../server.js'); - abstracted into ./test/lib/server-control.js
const url = `http://localhost:${process.env.PORT}`;

mongoose.Promise = Promise;

// step 76
const server = require('../server.js');

// step 62
const exampleUser = {
  username: 'exampleuser',
  password: '1234',
  email: 'exampleuser@test.com'
};

// step 63
const exampleGallery = {
  name: 'test gallery',
  desc: 'test gallery description'
};

// step 64
describe('Gallery Routes', function() {

  // step 76
  before( done => {
    serverControl.serverOn(server, done);
  });
  after( done => {
    serverControl.serverOff(server, done);
  });

  afterEach( done => {
    Promise.all([
      User.remove({}),
      Gallery.remove({})
    ])
    .then( () => done())
    .catch(done);
  });

  // step 65
  describe('POST: /api/gallery', () => {
    before( done => {
      new User(exampleUser)
        .generatePasswordHash(exampleUser.password)
        .then( user => user.save())
        .then( user => {
          this.tempUser = user;
          return user.generateToken();
        })
        .then( token => {
          this.tempToken = token;
          done();
        })
        .catch(done);
    });
    it('should return a gallery', done => {
      request.post(`${url}/api/gallery`)
        .send(exampleGallery)
        .set({
          Authorization: `Bearer ${this.tempToken}`
        })
        .end((err, res) => {
          if(err) return done(err);
          let date = new Date(res.body.created).toString();
          expect(res.body.name).to.equal(exampleGallery.name);
          expect(res.body.desc).to.equal(exampleGallery.desc);
          expect(res.body.userID).to.equal(this.tempUser._id.toString());
          expect(date).to.not.equal('Invalid Date');
          done();
        });
    });
  });

  // step 66
  describe('GET: /api/gallery/:id', () => {
    before( done => {
      new User(exampleUser)
        .generatePasswordHash(exampleUser.password)
        .then( user => user.save())
        .then( user => {
          this.tempUser = user;
          return user.generateToken();
        })
        .then( token => {
          this.tempToken = token;
          done();
        })
        .catch(done);
    });
    before( done => {
      exampleGallery.userID = this.tempUser._id.toString();
      new Gallery(exampleGallery).save()
        .then( gallery => {
          this.tempGallery = gallery;
          done();
        })
        .catch(done);
    });
    after( () => {
      delete exampleGallery.userID;
    });
    it('should return a gallery', done => {
      request.get(`${url}/api/gallery/${this.tempGallery._id}`)
        .set({
          Authorization: `Bearer ${this.tempToken}`
        })
        .end((err, res) => {
          if(err) return done(err);
          let date = new Date(res.body.created).toString();
          expect(res.body.name).to.equal(exampleGallery.name);
          expect(res.body.desc).to.equal(exampleGallery.desc);
          expect(res.body.userID).to.equal(this.tempUser._id.toString());
          expect(date).to.not.equal('Invalid Date');
          done();
        });
    });
  });
});
