'use strict';

const Router = require('express').Router;
const jsonParser = require('body-parser').json();
const debug = require('debug')('note:note-router');
const Note = require('../model/note.js');
const noteRouter = new Router();

noteRouter.post('/api/note', jsonParser, function(req, res, next) {
  debug('POST: /api/note');

  Note.createNote(req.body)
    .then( note => res.json(note))
    .catch( err => next(err));
});

noteRouter.get('/api/note/:id', function(req, res, next) {
  debug('GET: /api/note/:id');

  Note.fetchNote(req.params.id)
    .then( note => res.json(note))
    .catch( err => next(err));
});

noteRouter.get('/api/note', function(req, res, next) {
  debug('GET: /api/note');

  Note.fetchIDs()
    .then( note => res.json(note))
    .catch(next);
});

// noteRouter.delete('/api/note', function(req, res, next){
//   debug('DELETE: /api/note/:id');
//
//   Note.deleteNote(req.params.id)
//     .catch(next);
// });

noteRouter.put('/api/note', jsonParser, function(req, res, next) {
  debug('PUT: /api/note');

  Note.updateNote(req.query.id, req.body)
    .then( note => res.json(note))
    .catch(next);
});

module.exports = noteRouter;
