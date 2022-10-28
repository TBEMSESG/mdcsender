const { SerialPort } = require('serialport')
const axios = require('axios');

//define the Power meter (in this case a Shelly em3). The endpoitn may vary depending on the device. 
//The Ip is to be defined. maybe it is possible to work with dns entries like shelly.local to have a standard? 
const shelly = 'http://10.10.99.134/'
const endpoint = 'status/';
// Define the threshold under which the screen has to be turned off (in Watt)
const threshold = 600;

//Reads the current state of the measurement and triggers changes to the screens
function readShelly() {
    axios.get(shelly + endpoint)
    .then(function (response) {
        // handle success
        var l1 = response.data.emeters[0].power;
        var l2 = response.data.emeters[1].power;
        var l3 = response.data.emeters[2].power;
        var total = l1 + l2 + l3; 

        //console.log(`total: ${total} - Current Power: L1: ${l1}, L2: ${l2}, L3: ${l3}`);

        
        if (total <= threshold) {
            console.log(`total: ${total} - Total is fine, Lights are off`)
            //Call the MDC function to turn the screen OFF
            //...
        }

        if (total > threshold) {
            console.log(`total: ${total} - Total is High, Lights are ON`)
            //Call the MDC function to turn the screen ON
            //sendMDCOn();
        }
    })
    .catch(function (error) {
        // handle error
        console.log('Our Error is : ', error);
    })
    .finally(function () {
        // always executed
    });
}

function timer (){ 
        readShelly();
        timing = setTimeout(timer, 5000)
}
timer();



function sendMDCOn(){


}



// const hdmi1ToSend = [0xAA, 0x14, 0xFE, 0x01, 0x21, 0x34]
// var hdmi1hex = new Uint8Array(hdmi1ToSend);
// const miToSend = [0xAA, 0x14, 0xFE, 0x01, 0x60, 0x73]
// var mihex = new Uint8Array(miToSend);
// const poweronToSend = [0xAA, 0x11, 0xFE, 0x01, 0x01, 0x11]
// var poweronhex = new Uint8Array(poweronToSend);
// const poweroffToSend = [0xAA, 0x11, 0xFE, 0x01, 0x00, 0x10]
// var poweroffhex = new Uint8Array(poweroffToSend);

// function sendCode(msg) { 
//     // Create a port
//     const port = new SerialPort({
//     path: '/dev/ttyAMA0',
//     baudRate: 9600,
//     })


//     port.write(msg, function(err) {
//         if (err) {
//         return console.log('Error on write: ', err.message)
//         }
//         console.log('message written')
//     })
    
//     // Open errors will be emitted as an error event
//     port.on('error', function(err) {
//         console.log('Error: ', err.message)
//     })
// };

