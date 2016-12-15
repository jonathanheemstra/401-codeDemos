'use strict';

const storage = {};

module.exports = exports = {};

exports.createItem = function(schemaName, item) {
  if(!schemaName) return Promise.reject(new Error('create item = expected schema name'));
  if(!item) return Promise.reject(new Error('create item = expected item'));
  if(!storage[schemaName]) storage[schemaName] = {};

  storage[schemaName][item.id] = item;
  return Promise.resolve(item);
};

exports.fetchItem = function(schemaName, id) {
  return new Promise( (resolve, reject) => {
    if(!schemaName) return reject(new Error('fetch item = expected schema name'));
    if(!id) return reject(new Error('fetch item = expected id'));

    var schema = storage[schemaName];
    if(!schema) return reject(new Error('fetch item = schema not found'));

    var item = schema[id];
    if(!item) return reject(new Error('fetch item =  item not found'));

    resolve(item); 
  });
};
