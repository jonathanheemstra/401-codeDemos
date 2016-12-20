'use strict';

const uuid = require('node-uuid');
const debug = require('debug')('note:note');
const storage = require('../lib/storage.js');
const createError = require('http-errors');

const Note = module.exports = function(name, content) {
  debug('note constructor');

  // refactor to a throw createError(400, 'expected name');
  if(!name) throw new Error('expected name');
  // refactor to a throw createError(400, 'expected content');
  if(!content) throw new Error('expected content');

  this.id = uuid.v1();
  this.name = name;
  this.content = content;
};

Note.createNote = function(_note) {
  debug('createNote');

  try {
    let note = new Note(_note.name, _note.content);
    return storage.createItem('note', note);
  } catch(err) {
    return Promise.reject(err);
  }
};

Note.fetchNote = function(_id) {
  debug('fetchNote');

  return storage.fetchItem('note', _id);
};
