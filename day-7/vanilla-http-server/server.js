'use strict';

const http = require('http');
const url = require('url');
const queryString = require('querystring');
const cowsay = require('cowsay');
const parseBody = require('./lib/parse-body.js');
const PORT = process.env.PORT || 8080;

const server = http.createServer(function(req, res) {
  req.url = url.parse(req.url);
  req.url.query = queryString.parse(req.url.query);

  if(req.method === 'POST') {
    parseBody(req, function(err) {
      if(err) console.error(err);
      console.log('POST reqest body======================\r\n', req.body);
    });
  }

  if(req.method === 'GET' && req.url.pathname === '/cowsay') {
    res.write(cowsay.say({ text: 'hello from cowville'}));
    res.end();
  }

  res.end();
});

server.listen(PORT, () => {
  console.log('server up:', PORT);
});
