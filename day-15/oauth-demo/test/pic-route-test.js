'use strict';

// step 88
const expect = require('chai').expect;
const request = require('superagent');
// const debug = require('debug')('cfgram:pic-router-test');

// step 89
const Pic = require('../model/pic.js');
const User = require('../model/user.js');
const Gallery = require('../model/gallery.js');

// step 90
const serverControl = require('./lib/server-control.js');
const server = require('../server.js');

// step 91
const url = `http://localhost:${process.env.PORT}`;

// step 92
const exampleUser = {
  username: 'exampleUser',
  password: '123',
  email: 'test@test.com'
};

const exampleGallery = {
  name: 'test gallery',
  desc: 'test gallery description'
};

const examplePic = {
  name: 'example pic',
  desc: 'example pic description',
  image: `${__dirname}/data/tester.png`
};

// step 93
describe('Pic Routes', function() {
  // step 94
  before( done => {
    serverControl.serverOn(server, done);
  });
  after( done => {
    serverControl.serverOff(server, done);
  });

  // step 95
  afterEach( done => {
    Promise.all([
      Pic.remove({}),
      User.remove({}),
      Gallery.remove({})
    ])
    .then( () => done())
    .catch(done);
  });

  // step 96
  describe('POST: /api/gallery/:galleryID/pic', function() {
    describe('Valid Toke & Data', function() {
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
      after( done => {
        delete exampleGallery.userID;
        done();
      });

      it('should return a pic', done => {
        request.post(`${url}/api/gallery/${this.tempGallery._id}/pic`)
          .set({ Authorization: `Bearer ${this.tempToken}`})
          .field('name', examplePic.name)
          .field('desc', examplePic.desc)
          .attach('image', examplePic.image)
          .end((err, res) => {
            if(err) return done(err);
            expect(res.body.name).to.equal(examplePic.name);
            expect(res.body.desc).to.equal(examplePic.desc);
            expect(res.body.galleryID).to.equal(this.tempGallery._id.toString());
            done();
          });
      });
    });
  });
});
