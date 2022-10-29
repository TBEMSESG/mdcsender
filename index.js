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
const interval = 10000; //defines how often Power is checked and changes triggered (in ms)

let panelStatus = 0;  //defines the current status of the Panel, not to turn on an already running panel starts at 0 at script first run

//Define if using RJ45 or Serial or Both
//possible values "ethernet", "serial" or "both"
let connectionType = 'ethernet';

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
            console.log(panelStatus)

            if (panelStatus === 1)  {         
                if (connectionType == 'ethernet' || connectionType == 'both') {
                    //for (let i=0; i < hosts.length ; i++) { sendRj(i,hosts, port, poweroffhex)  };
                    console.log('running Turn off Command RJ45')
                    panelStatus = 0;
                }

                if (connectionType == 'serial' || connectionType == 'both') {
                    //for (let i=0; i < hosts.length ; i++) { sendRj(i,hosts, port, poweroffhex)  };
                    console.log('running Turn off Command Serial')
                    panelStatus = 0;
                }
            }
            else console.log('panel is already off');
        
        }

        if (total > threshold) {
            console.log(`total: ${total} - Total is High, Lights are ON`)
            console.log(panelStatus)
            //Call the MDC function to turn the screen ON , uncomment next line to activate
            if (panelStatus === 0)  {         
                if (connectionType == 'ethernet' || connectionType == 'both') {
                    //for (let i=0; i < hosts.length ; i++) { sendRj(i,hosts, port, poweronhex)  };
                    console.log('running Turn ON Command RJ45')
                    panelStatus = 1;
                }

                if (connectionType == 'serial' || connectionType == 'both') {
                    //for (let i=0; i < hosts.length ; i++) { sendRj(i,hosts, port, poweronhex)  };
                    console.log('running Turn ON Command Serial')
                    panelStatus = 1;
                }
                
            }
            else console.log('panel is already on');
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

// timer() runs the powercheck at given interval (can be changed in settings) 
function timer (){ 
        readShelly();
        timing = setTimeout(timer, interval)
}
timer();


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

