"use strict"

// const ws = require('nodejs-websocket');
const port = 8000,
      IP = "172.20.10.2",
      tIP = `ws://${IP}:${port}`;

const socket = new WebSocket(tIP);

socket.onmessage = function (e) {
    console.log(e.data)
    const [ temp, humid ] = e.data.split(', ')
    // add to data
    data.push({
        time: ++t,
        temp: +temp,
        humid: +humid
    })

    // d3
    tick()
}

// Connection opened
socket.addEventListener('open', (event) => {
  socket.send('Client Connected!');
  console.log('Browser Connected!')
  console.log(event)
});

// // Listen for messages
// socket.addEventListener('binary', (event) => {
//   console.log('Binary from server', event);
// });
//
// socket.addEventListener('message', (event) => {
//   console.log('Message from server', event);
// });
//
// socket.addEventListener('data', (event) => {
//   console.log('Data from server', event);
// });
//
// socket.addEventListener('text', (event) => {
//   console.log('Text from server', event);
// });


// const client = ws.connect(tIP, () => {
//     client.sendText('Client Connected')
// })
//
// // when tessel sends us binary
// client.on('binary', (stream) => {
//     stream.setEncoding('utf8')
//     // stream.pipe(process.stdout);
//
//     stream.on("data", chunk => {
//         // convert to float
//         const [ t, h ] = chunk.split(', ')
//         console.log(t, h);
//
//         // add to data
//         data.push({
//             time: ++t,
//             temp: +temp,
//             humid: +humid
//         })
//
//         // d3
//         tick();
//     });
//
// })




