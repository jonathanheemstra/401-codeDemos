'use strict';

//brings in node http module
const http = require('http');
const Router = require('./lib/router.js');
const consoleLog = require('./path.js');
const PORT = process.env.PORT || 8080;
const router = new Router();

require('./route/note-route.js')(router);

const server = http.createServer(router.route());

server.listen(PORT, () => {
  consoleLog(`Server up on ${PORT}`);
});
