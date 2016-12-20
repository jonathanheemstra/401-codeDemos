'use strict';

const uuid = require('node-uuid');
const createError = require('http-errors');
const debug = require('debug')('note:note-model');
const storage = require('../lib/storage.js');

const Note = module.exports = function(name, content) {
  debug('Note constructor');

  if(!name) throw createError(400, 'expected name');
  if(!content) throw createError(400, 'expected content');

  this.id = uuid.v1();
  this.name = name;
  this.content = content;
};

Note.createNote = function(_note) {
  debug('createNote method');
  //TODO: create createNote functionality
};

Note.fetchNote = function(_id) {
  debug('fetchNote method');
  //TODO: create fetchNote functionality
}
