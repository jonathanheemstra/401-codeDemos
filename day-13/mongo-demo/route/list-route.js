'use strict';

const Router = require('express').Router;
const debug = require('debug')('list:list-route');
const jsonparser = require('body-parser').json();
const List = require('../model/list.js');
const listRouter = module.exports = new Router();

listRouter.post('/api/list', jsonparser, function(req, res, next) {
  debug('POST: /api/list');

  req.body.timestamp = new Date();
  new List(req.body).save()
    .then( list => res.json(list))
    .catch(next);
});

listRouter.get('/api/list/:id', function(req, res, next) {
  debug('GET: /api/list/:id');

  List.findById(req.params.id)
    .then( list => res.json(list))
    .catch(next);
});
