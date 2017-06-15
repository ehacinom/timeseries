"use strict"

const ws = require('nodejs-websocket');
const port = 8000,
      IP = "172.20.10.2",
      tIP = `ws://${IP}:${port}`;

const client = ws.connect(tIP, () => {
    client.sendText('Client Connected')
})

// when tessel sends us binary
client.on('binary', (stream) => {
    stream.pipe(process.stdout);
})