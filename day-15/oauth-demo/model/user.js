'use strict';

// step 22
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const createError = require('http-errors');
const Promise = require('bluebird');
const debug = require('debug')('cfgram:user');

// step 23
const Schema = mongoose.Schema;

// step 24
const userSchema = Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  findHash: { type: String, unique: true }
});

// step 25
userSchema.methods.generatePasswordHash = function(password) {
  debug('generatePasswordHash');

  return new Promise((resolve, reject) => {
    bcrypt.hash(password, 10, (err, hash) => {
      debug('generatePasswordHash:bcrypt.hash', password);
      if(err) return reject(err);
      this.password = hash;
      return resolve(this);
    });
  });
};

// step 26
userSchema.methods.comparePasswordHash = function(password) {
  debug('comparePasswordHash');

  return new Promise((resolve, reject) => {
    bcrypt.compare(password, this.password, (err, valid) => {
      debug('comparePasswordHash:bcrypt.compare', password);
      if(err) return reject(err);
      if(!valid) return reject(createError(401, 'wrong password'));
      return resolve(this);
    });
  });
};

// step 27
userSchema.methods.generateFindHash = function() {
  debug('generateFindHash');

  return new Promise((resolve, reject) => {
    debug('generateFindHash:newPromise');
    let tries = 0;

    _generateFindHash.call(this);

    function _generateFindHash() {
      debug('generateFindHash:newPromise:_generateFindHash');
      this.findHash = crypto.randomBytes(32).toString('hex');
      this.save()
        .then( () => {
          debug('generateFindHash:newPromise:_generateFindHash:then', this.findHash);
          return resolve(this.findHash);
        })
        .catch( err => {
          debug('generateFindHash:newPromise:_generateFindHash:catch', err);
          if(tries > 3) return reject(err);
          tries++;
          _generateFindHash.call(this);
        });
    }
  });
};

// step 28
userSchema.methods.generateToken = function() {
  debug('generateToken');

  return new Promise((resolve, reject) => {
    debug('generateToken:newPromise');
    this.generateFindHash()
      .then( findHash => {
        debug('generateToken:newPromise:generateFindHash:then.findHash', findHash);
        resolve(jwt.sign( { token: findHash }, process.env.APP_SECRET));
      })
      .catch( err => {
        debug('generateToken:newPromise:generateFindHash');
        return reject(err);
      });
  });
};

// step 29
module.exports = mongoose.model('user', userSchema);
