"use strict";

// this is run on Node.js
//     node textClient.js
// https://forums.tessel.io/t/using-websockets/821

// Always prepend tIP with 'ws://' to indicate websocket
const ws = require('nodejs-websocket'),
      port = 8000,
      IP = "172.20.10.2", // tessel's IP
      tIP = `ws://${IP}:${port}`; 

// Set the binary fragmentation to 1 byte so it instantly sends
// anything we write to it
ws.setBinaryFragmentation(1);

// When we get a connection
var connection = ws.connect(tIP, () => {

  // Create a new stream
  var socketStream = connection.beginBinary();
  
  // Pipe the data from stdin to our server
  process.stdin.pipe(socketStream);
});