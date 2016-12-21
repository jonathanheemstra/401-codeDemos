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

  try {
    let note = new Note(_note.name, _note.content);
    return storage.createItem('note', note);
  } catch (err) {
    return Promise.reject(createError(400, err.message));
  }
};

Note.fetchNote = function(_id) {
  debug('fetchNote method');

  return storage.fetchItem('note', _id);
};

Note.updateNote = function(_id, _note) {
  debug('updateNote');

  return storage.fetchItem('note', _id)
    .then( note => {
      for(var prop in note) {
        if(prop == 'id') continue;
        if(_note[prop]) note[prop] = _note[prop];
      }
      return storage.createItem('note', note);
    })
    .catch( err => Promise.reject(createError(404, err.message)));
};

Note.deleteNote = function(_id) {
  debug('deleteNote');

  return storage.deleteItem('note', _id);
};

Note.fetchIDs = function() {
  debug('fetchIDs');

  return storage.availableIds('note');
};
