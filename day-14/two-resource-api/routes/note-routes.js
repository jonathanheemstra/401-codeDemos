'use strict';

const Router = require('express').Router;
const jsonParser = require('body-parser').json();
const List = require('../model/list.js');
const debug = require('debug')('note:note-routes');

const noteRouter = module.exports = new Router();

noteRouter.post('/api/list/:listID/note', jsonParser, function(req, res, next) {
  debug('POST: /api/list/:listID/note');

  List.findByIdAndAddNote(req.params.listID, req.body)
    .then( note => res.json(note))
    .catch(next);
});
