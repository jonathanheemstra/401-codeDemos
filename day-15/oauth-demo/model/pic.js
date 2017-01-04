'use strict';

// step 77
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const debug = require('debug')('cfgram:pic');

// step 78
const picSchema = Schema({
  name: { type: String, required: true },
  desc: { type: String, required: true },
  userID: { type: Schema.Types.ObjectId, required: true },
  galleryID: { type: Schema.Types.ObjectId, required: true },
  imageURI: { type: String, required: true, unique: true },
  objectKey: { type: String, required: true, unqiue: true },
  created: { type: Date, default: Date.now }
});

debug('picSchema', picSchema);
module.exports = mongoose.model('pic', picSchema);
