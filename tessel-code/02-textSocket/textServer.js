"use strict";

//// tessel server
// https://forums.tessel.io/t/using-websockets/821

let ws = require("nodejs-websocket")
let port = 8000;

// create server
let server = ws.createServer(conn => {
    console.log('new connection! server')
    
    conn.on('text', str => {
        console.log(`server recieved message: ${str}`);
        
        // send it back
        conn.sendText(`${str}!!!!`);
    });
    
    conn.on('close', (code, reason) => {
        console.log('connection closed');
        console.log(`code: ${code}\nreason: ${reason}`);
    });
    
}).listen(port, '0.0.0.0');

console.log(require('os').networkInterfaces());

console.log(`listening on port ${port}`);
