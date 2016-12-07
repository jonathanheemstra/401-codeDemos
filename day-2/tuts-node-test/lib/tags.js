'use strict';
// Created using Tut+ tutorial: https://code.tutsplus.com/tutorials/testing-in-nodejs--net-35018

module.exports = exports = {};

exports.parse = function(args, defaults, replacements) {
  var options = {};
  if(typeof defaults === 'object' && !(defaults instanceof Array)) {
    options = defaults;
  }
  if(typeof replacements === 'object' && !(defaults instanceof Array)) {
    for (let i in args) {
      let arg = args[i];
      if (arg.charAt(0) === '-' && arg.charAt(1) !== '-') {
        arg = arg.substr(1);
        if(arg.indexOf('=') !== -1) {
          arg = arg.split('=');
          var keys = arg.shift();
          var value = arg.join('=');

          arg = keys.split('');
          var key = arg.pop();
          if(replacements.hasOwnProperty(key)) {
            key = replacements[key];
          }

          args.push('--' + key + '=' + value);
        } else {
          arg = arg.split('');
        }
        arg.forEach(function(key) {
          if(replacements.hasOwnProperty(key)) {
            key = replacements[key];
          }
          args.push('--' + key);
        });
      }
    }
  }
  for (let i in args) {
    let arg = args[i];
    if (arg.substr(0, 2) === '--') {
      arg = arg.substr(2);
      if (arg.indexOf('=') !== -1) {
        arg = arg.split('=');
        let key = arg.shift();
        let value = arg.join('=');
        if (/^[0-9]+$/.test(value)) {
          value = parseInt(value, 10);
        }
        options[key] = value;
      } else {
        options[arg] = true;
      }
    }
  }
  return options;
};
