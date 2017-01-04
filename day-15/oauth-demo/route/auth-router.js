'use strict';

// step 30
const jsonParser = require('body-parser').json();
const debug = require('debug')('cfgram:auth-router');
const Router = require('express').Router;
const basicAuth = require('../lib/basic-auth-middleware.js');

// step 31
const User = require('../model/user.js');

// step 32
const authRouter = module.exports = Router();

// step 33
authRouter.post('/api/signup', jsonParser, function(req, res, next) {
  debug('POST: /api/signup');

  let password = req.body.password;
  delete req.body.password;
  debug('POST: /api/signup:password');

  let user = new User(req.body);
  debug('POST: /api/signup:user');

  user.generatePasswordHash(password)
    .then( () => {
      debug('POST: /api/signup:generatePasswordHash:then.save');
      return user.save();
    })
    .then( () => {
      debug('POST: /api/signup:generatePasswordHash:then.generateToken');
      return user.generateToken();
    })
    .then( token => {
      debug('POST: /api/signup:generatePasswordHash:then.token');
      return res.send(token);
    })
    .catch(next);
});

// step 34
authRouter.get('/api/signin', basicAuth, function(req, res, next) {
  debug('GET: /api/signin');

  User.findOne({ username: req.auth.username })
    .then( user => {
      debug('GET: /api/signin:findOne:then.comparePasswordHash');
      return user.comparePasswordHash(req.auth.password);
    })
    .then( user => {
      debug('GET: /api/signin:findOne:then.generateToken');
      return user.generateToken();
    })
    .then( token => {
      debug('GET: /api/signin:findOne:then.token');
      return res.send(token);
    })
    .catch(next);
});
