'use strict';

// the net module gives access to use websockets
const net = require('net');
// events module
const EE = require('events');
// client constructor
const Client = require('./model/client.js');
// a port where our application will run
const PORT = process.env.PORT || 3000;
// sets up a server and access to methods that allow to create a server
const server = net.createServer();
// set up ee to be a new constructed event object.
const ee = new EE();
// allows every client who has connected to the server to be kept track up
const pool = [];

server.listen(PORT, function() {
  console.log(`server up: ${PORT}`);
});

ee.on('@dm', function(client, string) {
  let nickname = string.split(' ').shift().trim();
  let message = string.split(' ').slice(1).join(' ').trim();

  console.log('nickname', nickname);
  console.log('message', message);

  pool.forEach( client => {
    if(client.nickname === nickname) {
      client.socket.write(`${client.nickname}: ${message}`);
    }
  });
});

ee.on('@all', function(client, string) {
  pool.forEach( c => {
    console.log('c in the all function !!!!!', c);
    c.socket.write(`${client.nickname}: ${string}`);
  });
});

ee.on('default', function(client, string) {
  client.socket.write('not a command\n');
});

// when our server connects with a socket we need to set up the connections
server.on('connection', function(socket) {
  // pulling in a client object and instantiating it
  var client = new Client(socket);
  pool.push(client);

  console.log('client pool id:', client.id);
  // will show up when you run server via 'node server.js' and 'telnet 172.16.10.192 3000' in another terminal tabl
  console.log('we have connected successfully');

  socket.on('data', function(data) {
    // the data is first coming in as a buffer and using toString to encode the buffer in UTF-8
    const command = data.toString().split(' ').shift().trim();

    if(command.startsWith('@')) {
      // slice will take everything after the '@'
      ee.emit(command, client, data.toString().split(' ').slice(1).join(' '));
      return;
    }

    ee.emit('default', client, data.toString());
  });
});
