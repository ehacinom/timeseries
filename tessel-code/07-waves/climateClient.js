"use strict"

// var TEMPERATURE = timeSeriesGraph().title('Temperature').miny(80).maxy(90);
// var HUMIDITY = timeSeriesGraph().title('Humidity').miny(40).maxy(50);
var TEMP = timeSeriesGraph().title('Temp -> waveform')
var HUMID = timeSeriesGraph().title('Humidity -> waveform')
var CONVOLUTION = timeSeriesGraph().title('Waveform Convolution')

const port = 8000,
      IP = "172.20.10.2",
      tIP = `ws://${IP}:${port}`;

const socket = new WebSocket(tIP);

// Connection opened
socket.addEventListener('open', (event) => {
  socket.send('Client Connected!');
  console.log('Browser Connected!')
});

socket.onmessage = function (e) {
    // console.log(e.data);
    const [ intemp, inhumid ] = e.data.split(', ')
    
    const tValue = (Number('.' + intemp.slice(4)) - 0.5) * 2;
    const hValue = (Number('.' + inhumid.slice(4)) - 0.5) * 2;

    // TEMPERATURE.add(+intemp)
    // HUMIDITY.add(+inhumid)
    TEMP.add(tValue)
    HUMID.add(hValue)
    CONVOLUTION.add(tValue*hValue)
}
