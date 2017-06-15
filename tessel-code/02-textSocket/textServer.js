"use strict";

// this is run on the tessel server
// t2 run textServer.js
// https://forums.tessel.io/t/using-websockets/821

let ws = require("nodejs-websocket")
let port = 8000;

// create server
let server = ws.createServer(conn => {
    console.log('new connection! server')
    
    // if tessel recieves text from the client/node
    conn.on('text', str => {
        console.log(`server recieved message: ${str}`);
        
        // send it back
        conn.sendText(`${str}!!!!`);
    });
    
    // notify on connection close
    conn.on('close', (code, reason) => {
        console.log('connection closed');
        console.log(`code: ${code}\nreason: ${reason}`);
    });
    
}).listen(port); // '0.0.0.0'

console.log('\n\nPrinting off the os.networkInterface, which will give the Tessel IP address underthe \'wlan0\' property.\n\n', require('os').networkInterfaces());

console.log(`\n\nlistening on port ${port}`);
