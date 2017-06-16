"use strict"

const tessel = require('tessel');
const climate = require('climate-si7020').use(tessel.port['A']);
const ws = require("nodejs-websocket");
ws.setBinaryFragmentation(1);
const port = 8000;

/*
    d decimal digits of temperature (F)
    d decimal digits of humidity (%RH)
    len array max length
    timeout ms delay
*/
const d = 5,
      len = 100,
      timeout = 300;

// writeable stream stored outside the server callback
let socketStream, connection;

// stop looping forever after closing client connection
let isOpen = true;

// create server
var server = ws.createServer((conn) => {
    console.log('New websocket connection');

    // if tessel recieves text from the client/node
    // create writeable stream
    conn.on('text', str => {
        console.log(`server recieved message: ${str}`);
        
        // writeable stream
        // socketStream = conn.beginBinary();

        isOpen = true;
        connection = conn;
    });
    
    conn.on('close', (code, reason) => {
        isOpen = false;
        connection = null;
        console.log('connection closed');
    });
}).listen(port);
console.log('listening on port', port)

// connect to climate module
climate.on('ready', () => {
    console.log('New climate connection');
    
    // loop forever
    setImmediate(function loop () {
        climate.readTemperature('f', function (err, temp) {
            climate.readHumidity(function (err, humid) {
                let output = temp.toFixed(d)+', '+humid.toFixed(d)
                
                // tessel cli log
                console.log(output);

                // stream and emit to client
                // if (socketStream && isOpen) socketStream.write(output)
                if (connection && isOpen) {
                    try {connection.send(output) }
                    catch (err) { 
                        console.log('Error closing:', err)
                        connection.close()
                    }
                }

                setTimeout(loop, timeout);
            });
        });
    });
});
