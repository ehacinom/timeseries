"use strict";

//// tessel server
// https://forums.tessel.io/t/using-websockets/821

let ws = require('nodejs-websocket');
let port = 8000;

// tessel's IP
let tIP = "172.20.10.2" //"192.168.1.101"; 
// `ws://${tIP}:${port}`
let client = ws.connect('ws://172.20.10.2:8000', () => {
    // when client/us connects send message
    client.sendText('yay! client connected');
});

// when tessel sends us text
client.on('text', str => {
    console.log(`Recieved message back: ${str}`);
});