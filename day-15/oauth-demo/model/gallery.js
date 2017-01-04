'use strict';

// step 43
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const debug = require('debug')('cfgram:gallery');

// step 44
const gallerySchema = Schema({
  name: { type: String, required: true },
  desc: { type: String, required: true },
  created: { type: Date, required: true, default: Date.now },
  userID: { type: Schema.Types.ObjectId, required: true }
});

debug('gallerySchema', gallerySchema);
// step 45
module.exports = mongoose.model('gallery', gallerySchema);
