'use strict';

// LEARN YOU THE NODE.JS FOR MUCH WIN!
//
//  HTTP CLIENT (Exercise 7 of 13)
//
//   Write a program that performs an HTTP GET request to a URL provided to you
//   as the first command-line argument. Write the String contents of each
//   "data" event from the response to a new line on the console (stdout).
//
//  ─────────────────────────────────────────────────────────────────────────────
//
//  HINTS
//
//   For this exercise you will need to use the http core module.
//
//   The http.get() method is a shortcut for simple GET requests, use it to
//   simplify your solution. The first argument to http.get() can be the URL
//   you want to GET; provide a callback as the second argument.
//
//   Unlike other callback functions, this one has the signature:
//
//      function callback (response) { /* ... */ }
//
//   Where the response object is a Node Stream object. You can treat Node
//   Streams as objects that emit events. The three events that are of most
//   interest are: "data", "error" and "end". You listen to an event like so:
//
//      response.on("data", function (data) { /* ... */ })
//
//   The "data" event is emitted when a chunk of data is available and can be
//   processed. The size of the chunk depends upon the underlying data source.
//
//   The response object / Stream that you get from http.get() also has a
//   setEncoding() method. If you call this method with "utf8", the "data"
//   events will emit Strings rather than the standard Node Buffer objects
//   which you have to explicitly convert to Strings.

const http = require('http');

let url = process.argv[2];

http.get(url, res => {
  res.setEncoding('utf8');
  res.on('data', data => {
    console.log(data);
  });
});


// BEST PRACTICE

// var http = require('http')
//
// http.get(process.argv[2], function (response) {
//   response.setEncoding('utf8')
//   response.on('data', console.log)
//   response.on('error', console.error)
// }).on('error', console.error)
