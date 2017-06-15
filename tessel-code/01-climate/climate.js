// tessel
const tessel = require('tessel');
const climatelib = require('climate-si7020');
const climate = climatelib.use(tessel.port['A']);


/*
    d decimal digits of temperature (F)
    d decimal digits of humidity (%RH)
    len array max length
    timeout ms delay
*/
const d = 5;
const len = 100;
const timeout = 300;

// connect
climate.on('ready', function () {
    console.log('Connected to climate module');

    // Loop forever
    setImmediate(function loop () {
        climate.readTemperature('f', function (err, temp) {
            if (err) throw err;
            
            climate.readHumidity(function (err, humid) {
                if (err) throw err;
                
                console.log('Degrees:', temp.toFixed(d) + ' F',
                            'Humidity:', humid.toFixed(d) + ' %RH');
                
                // loop again
                setTimeout(loop, timeout);                     
            });
        });
    });
});

climate.on('error', function(err) {
    console.log('error connecting module', err);
});

