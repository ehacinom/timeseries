"use strict";

// this is run on Node.js
//     node textClient.js
// https://forums.tessel.io/t/using-websockets/821

// Always prepend tIP with 'ws://' to indicate websocket
const ws = require('nodejs-websocket'),
      port = 8000,
      IP = "172.20.10.2", // tessel's IP
      tIP = `ws://${IP}:${port}`; 

// connect to tessel IP and send a text!
let client = ws.connect(tIP, () => {
    // when client/us connects send message
    client.sendText('yay! client connected');
});

// when tessel sends us text
client.on('text', str => {
    console.log(`Recieved message back: ${str}`);
});

