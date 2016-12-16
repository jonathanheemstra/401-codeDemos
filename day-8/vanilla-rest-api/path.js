/*
Gio d'Amelio super legit consoleLog function to better console.logs in the terminal.
https://github.com/giodamelio

TO USE:
1. require in this file anywhere you want to use.
    const consoleLog = require(`${__dirname}/path.js`);
2. call the function consoleLog(<CONSOLE LOG TEXT>)
*/

const path = require('path');

module.exports = function consoleWithLineNum() {
  // Get a stack using error magic
  const orig = Error.prepareStackTrace;
  Error.prepareStackTrace = function(_, stack){ return stack; };
  const err = new Error;
  Error.captureStackTrace(err, arguments.callee);
  const stack = err.stack;
  Error.prepareStackTrace = orig;

  // Convert the arguments to a real array
  const args = Array.prototype.slice.call(arguments);

  // Get line number and file path
  const lineNum = stack[0].getLineNumber();
  const fullPath = stack[0].getFileName();
  const relativePath = path.relative(process.cwd(), fullPath);

  console.log(`================== ${relativePath}:${lineNum} ==================\r\n\r\n ${args.join(' ')} \r\n\r\n*******************************************************`);
};
