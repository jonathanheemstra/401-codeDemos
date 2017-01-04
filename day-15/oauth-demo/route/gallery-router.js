'use strict';

// step 52
const Router = require('express').Router;
const jsonParser = require('body-parser').json();
const createError = require('http-errors');
const debug = require('debug')('cfgram:gallery-router');

// step 53
const Gallery = require('../model/gallery.js');
const bearerAuth = require('../lib/bearer-auth-middleware.js');

// step 54
const galleryRouter = module.exports = Router();

// step 55
galleryRouter.post('/api/gallery', bearerAuth, jsonParser, function(req, res, next) {
  debug('POST: /api/gallery');

  req.body.userID = req.user._id;
  debug('POST: /api/gallery:req.body.userID');
  new Gallery(req.body).save()
    .then( gallery => {
      debug('POST: /api/gallery:newGallery:then.gallery');
      return res.json(gallery);
    })
    .catch(next);
});

// step 56
galleryRouter.get('/api/gallery/:id', bearerAuth, function(req, res, next) {
  debug('GET: /api/gallery/:id');

  Gallery.findById(req.params.id)
    .then( gallery => {
      debug('GET: /api/gallery/:id:findById:then.gallery');
      if(gallery.userID.toString() !== req.user._id.toString()) {
        debug('GET: /api/gallery/:id:findById:!then.gallery');
        return next(createError(401, 'invalid user'));
      }
      return res.json(gallery);
    })
    .catch(next);
});
