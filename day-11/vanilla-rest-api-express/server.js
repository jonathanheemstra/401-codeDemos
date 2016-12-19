'use strict';

const express = require('express');
const morgan = require('morgan');
const createError = require('http-errors');
const jsonParser = require('body-parser').json();
const debug = require('debug')('note:server');
const app = express();
const Note = require('./model/note.js');
const PORT = process.env.PORT || 8080;

app.use(morgan('dev'));

app.get('/test', function(req, res) {
  debug('I am debugging my /test route');
  res.json({ 'msg': 'test route worked'});
});

app.post('/api/note',jsonParser, function(req, res, next) {
  debug('POST: /api/note');

  Note.createNote(req.body)
    .then( note => res.json(note))
    .catch( err => next(err));
});

app.get('/api/note', function(req, res, next) {
  debug('GET: /api/note');

  Note.fetchNote(req.query.id)
    .then( note => res.json(note))
    .catch( err => next(err));
});

app.use(function(err, req, res, next) {
  debug('error middleware');

  console.error(err.message);

  if(err.status) {
    res.status(err.status).send(err.name);
    return;
  }
  err = createError(500, err.message);
  res.status(err.status).send(err.name);
});

app.listen(PORT, () => {
  console.log(`Server up: ${PORT}`);
});
