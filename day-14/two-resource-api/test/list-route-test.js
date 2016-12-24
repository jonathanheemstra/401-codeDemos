'use strict';

const expect = require('chai').expect;
const request = require('superagent');
const List = require('../model/list.js');

require('../server.js');

const PORT = process.env.PORT || 3000;

const url = `http://localhost:${PORT}`;

const exampleList = {
  name: 'Test List',
  timestamp: new Date()
};

const exampleNote = {
  name: 'Test Note',
  content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
};

describe('List Routes', function() {
  describe('POST: /api/list', function() {
    describe('Valid Body', function() {
      after( done => {
        if(this.tempList) {
          List.remove({})
            .then( () => done())
            .catch(done);
          return;
        }
        done();
      });
      it('should return a list', done => {
        request.post(`${url}/api/list`)
          .send(exampleList)
          .end( (err, res) => {
            if(err) return done(err);
            expect(res.status).to.equal(200);
            expect(res.body.name).to.equal('Test List');
            this.tempList = res.body;
            done();
          });
      });
    });
  });
  describe('GET: /api/list/:id', function() {
    describe('Valid Body', function() {
      before( done => {
        new List(exampleList).save()
          .then( list => {
            this.tempList = list;
            return List.findByIdAndAddNote(list._id, exampleNote);
          })
          .then( note => {
            this.tempNote = note;
            done();
          })
          .catch(done);
      });
      after( done => {
        if(this.tempList) {
          List.remove({})
            .then( () => done())
            .catch(done);
          return;
        }
        done();
      });
      it('should return a list', done => {
        request.get(`${url}/api/list/${this.tempList._id}`)
          .end( (err, res) => {
            if(err) return done(err);
            expect(res.status).to.equal(200);
            expect(res.body.name).to.equal('Test List');
            expect(res.body.notes.length).to.equal(1);
            expect(res.body.notes[0].name).to.equal(exampleNote.name);
            done();
          });
      });
    });
  });

  describe('PUT: /api/list/:id', function() {
    describe('Valid Body', function() {
      before( done => {
        new List(exampleList).save()
        .then( list => {
          this.tempList = list;
          done();
        })
        .catch(done);
      });
      after( done => {
        if(this.tempList) {
          List.remove({})
            .then( () => done())
            .catch(done);
          return;
        }
        done();
      });
      it('should return a list', done => {
        var updated = { name: 'Updated Name' };

        request.put(`${url}/api/list/${this.tempList._id}`)
          .send(updated)
          .end( (err, res) => {
            if(err) return done(err);
            let timestamp = new Date(res.body.timestamp);
            expect(res.status).to.equal(200);
            expect(res.body.name).to.equal(updated.name);
            expect(timestamp.toString()).to.equal(exampleList.timestamp.toString());
            done();
          });
      });
    });
  });
});
