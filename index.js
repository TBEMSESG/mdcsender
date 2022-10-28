const { SerialPort } = require('serialport')
const axios = require('axios');
const { sendRj } = require('./Middleware/sendMdc');

require('./Middleware/sendMdc');

//define the Power meter (in this case a Shelly em3). The endpoitn may vary depending on the device. 
//The Ip is to be defined. maybe it is possible to work with dns entries like shelly.local to have a standard? 
const shelly = 'http://10.10.99.134/'
const endpoint = 'status/';
// Define the threshold under which the screen has to be turned off (in Watt)
const threshold = 600;

//Define settings for MDC via RJ45  
    const port = 1515;
    //Define the Ip addresses of the screens to control
	const hosts = [ '192.168.11.80','192.168.11.81' ]

//Define the MDC Commands to send
    const poweronToSend = [0xAA, 0x11, 0xFE, 0x01, 0x01, 0x11]
    var poweronhex = new Uint8Array(poweronToSend);
    const poweroffToSend = [0xAA, 0x11, 0xFE, 0x01, 0x00, 0x10]
    var poweroffhex = new Uint8Array(poweroffToSend);

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
            // for (let i=0; i < hosts.length ; i++) { sendRj(i,hosts, port, poweroffhex)  };
        }

        if (total > threshold) {
            console.log(`total: ${total} - Total is High, Lights are ON`)
            //Call the MDC function to turn the screen ON , uncomment next line to activate
            // for (let i=0; i < hosts.length ; i++) { sendRj(i,hosts, port, poweronhex)  };
            
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

