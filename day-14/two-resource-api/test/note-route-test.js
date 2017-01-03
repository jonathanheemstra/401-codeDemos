'use strict';

const expect = require('chai').expect;
const request = require('superagent');
const List = require('../model/list.js');
const Note = require('../model/note.js');
const console = require('../../../../path.js');

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


describe('Note Routes', function() {
  describe('POST: /api/list/:listID/note', function() {
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
        Promise.all([
          List.remove({}),
          Note.remove({})
        ])
        .then( () => done())
        .catch(done);
      });
      it('should return a note', done => {
        request.post(`${url}/api/list/${this.tempList._id}/note`)
          .send(exampleNote)
          .end( (err, res) => {
            if(err) return done(err);
            expect(res.body.name).to.equal(exampleNote.name);
            expect(res.body.listID).to.equal(this.tempList._id.toString());
            done();
          });
      });
    });
  });
});
