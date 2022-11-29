const { SerialPort } = require('serialport')
const axios = require('axios');
const { sendRj } = require('./Middleware/sendMdc');
const { sendcode } = require('./Middleware/sendMdc');
require('./Middleware/sendMdc');


// Comment : Run < export NODE_OPTIONS="--max-old-space-size=2048" > before starting node app


//define the Power meter (in this case a Shelly em3). The endpoitn may vary depending on the device. 
//The Ip is to be defined. maybe it is possible to work with dns entries like shelly.local to have a standard? 
const shelly = 'http://10.10.99.134/'
const endpoint = 'status/';
const shellySwitch = 'http://192.168.1.26/'
const endpointSwitch = 'status/';

const threshold = 50;  // Define the threshold under which the screen has to be turned off (in Watt)

const interval = 1000; //defines how often Power is checked and changes triggered (in ms)

let panelStatus = 0;  //defines the current status of the Panel, not to turn on an already running panel starts at 0 at script first run

//Define if using RJ45 or Serial or Both
//possible values "ethernet", "serial" or "both"
let connectionType = 'both';

//Define settings for MDC via RJ45  
const port = 1515;

const hosts = [ '192.168.1.38']; //Define the Ip addresses of the screens to control
const motionSensor = 'http://192.168.1.46/'; // In this case a shelly Movement Sensor
const motionEndpoint = 'status';

const vibrationSensor = 'http://192.168.1.46/'; // In this case a shelly Movement Sensor
const vibrationEndpoint = 'status';

//Define the MDC Commands to send
const panelonToSend = [0xAA, 0xF9, 0xFE, 0x01, 0x00, 0xF8]
var panelonhex = new Uint8Array(panelonToSend);
const paneloffToSend = [0xAA, 0xF9, 0xFE, 0x01, 0x01, 0xF9]
var paneloffhex = new Uint8Array(paneloffToSend);

//gets movement feedback from Shelly Movement sensor  waits for Timeout after Movement
function readMovement(){
    axios.get(motionSensor + motionEndpoint)
    .then(function (response) {
        // handle success
        var motion = response.data.sensor.motion;
        console.log(`Motion: ${motion}`)
        if  (motion == false) {
            
            if (panelStatus === 1)  {         
                if (connectionType == 'ethernet' || connectionType == 'both') {
                    for (let i=0; i < hosts.length ; i++) { sendRj(i,hosts, port, paneloffhex)  };
                    console.log('running Turn off Command RJ45')
                    panelStatus = 0;
                }

                if (connectionType == 'serial' || connectionType == 'both') {
                    for (let i=0; i < hosts.length ; i++) { sendcode(paneloffhex)  };
                    console.log('running Turn off Command Serial')
                    panelStatus = 0;
                }
            }
            //else console.log('panel is already off');            
        }

        if  (motion == true) {
            
            if (panelStatus === 0)  {         
                if (connectionType == 'ethernet' || connectionType == 'both') {
                    for (let i=0; i < hosts.length ; i++) { sendRj(i,hosts, port, panelonhex)  };
                    console.log('running Turn On Command RJ45')
                    panelStatus = 1;
                }

                if (connectionType == 'serial' || connectionType == 'both') {
                    for (let i=0; i < hosts.length ; i++) { sendcode(panelonhex)  };
                    console.log('running Turn On Command Serial')
                    panelStatus = 1;
                }
            }
            // else console.log('panel is already on');            
        }

    })
    .catch(function (error) {
          // handle error
        console.log('Our Error is : ', error);
    })
    .finally(function () {
        // always executed
    })
};


//Gets vibrations from Shelly Movement sensor . No Timeout wait
function readVibration(){
    axios.get(vibrationSensor + vibrationEndpoint)
    .then(function (response) {
        // handle success
        var motion = response.data.sensor.vibration;
        console.log(`Vibration registered: ${motion}`)
        if  (motion == false) {
            
            if (panelStatus === 1)  {         
                if (connectionType == 'ethernet' || connectionType == 'both') {
                    for (let i=0; i < hosts.length ; i++) { sendRj(i,hosts, port, paneloffhex)  };
                    console.log('running Turn off Command RJ45')
                    panelStatus = 0;
                }

                if (connectionType == 'serial' || connectionType == 'both') {
                    for (let i=0; i < hosts.length ; i++) { sendcode(paneloffhex)  };
                    console.log('running Turn off Command Serial')
                    panelStatus = 0;
                }
            }
            //else console.log('panel is already off');            
        }

        if  (motion == true) {
            
            if (panelStatus === 0)  {         
                if (connectionType == 'ethernet' || connectionType == 'both') {
                    for (let i=0; i < hosts.length ; i++) { sendRj(i,hosts, port, panelonhex)  };
                    console.log('running Turn On Command RJ45')
                    panelStatus = 1;
                }

                if (connectionType == 'serial' || connectionType == 'both') {
                    for (let i=0; i < hosts.length ; i++) { sendcode(panelonhex)  };
                    console.log('running Turn On Command Serial')
                    panelStatus = 1;
                }
            }
            // else console.log('panel is already on');            
        }

    })
    .catch(function (error) {
          // handle error
        console.log('Our Error is : ', error);
    })
    .finally(function () {
        // always executed
    })
};


// Reads the current Ambient light
function readLux(){
    axios.get(motionSensor + motionEndpoint)
    .then(function (response) {
        // handle success
        var lux = response.data.lux.value;
        console.log(`Lux: ${lux}`)
        if  (lux < 100 ) {
            
            if (panelStatus === 1)  {         
                if (connectionType == 'ethernet' || connectionType == 'both') {
                    for (let i=0; i < hosts.length ; i++) { sendRj(i,hosts, port, paneloffhex)  };
                    console.log('running Turn off Command RJ45')
                    panelStatus = 0;
                }

                if (connectionType == 'serial' || connectionType == 'both') {
                    for (let i=0; i < hosts.length ; i++) { sendcode(paneloffhex)  };
                    console.log('running Turn off Command Serial')
                    panelStatus = 0;
                }
            }
            //else console.log('panel is already off');            
        }

        if  (lux > 100) {
            
            if (panelStatus === 0)  {         
                if (connectionType == 'ethernet' || connectionType == 'both') {
                    for (let i=0; i < hosts.length ; i++) { sendRj(i,hosts, port, panelonhex)  };
                    console.log('running Turn On Command RJ45')
                    panelStatus = 1;
                }

                if (connectionType == 'serial' || connectionType == 'both') {
                    for (let i=0; i < hosts.length ; i++) { sendcode(panelonhex)  };
                    console.log('running Turn On Command Serial')
                    panelStatus = 1;
                }
            }
            // else console.log('panel is already on');            
        }

    })
    .catch(function (error) {
          // handle error
        console.log('Our Error is : ', error);
    })
    .finally(function () {
        // always executed
    })
};

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
            //console.log(`total: ${total} - Total is Low, Lights are off`)
            //console.log(panelStatus)

            if (panelStatus === 1)  {         
                if (connectionType == 'ethernet' || connectionType == 'both') {
                    for (let i=0; i < hosts.length ; i++) { sendRj(i,hosts, port, paneloffhex)  };
                    console.log('running Turn off Command RJ45')
                    panelStatus = 0;
                }

                if (connectionType == 'serial' || connectionType == 'both') {
                    for (let i=0; i < hosts.length ; i++) { sendcode(paneloffhex)  };
                    console.log('running Turn off Command Serial')
                    panelStatus = 0;
                }
            }
            else console.log('panel is already off');
        
        }

        if (total > threshold) {
            //console.log(`total: ${total} - Total is High, Lights are ON`)
            //console.log(panelStatus)
            //Call the MDC function to turn the screen ON , uncomment next line to activate
            if (panelStatus === 0)  {         
                if (connectionType == 'ethernet' || connectionType == 'both') {
                    for (let i=0; i < hosts.length ; i++) { sendRj(i,hosts, port, panelonhex)  };
                    console.log('running Turn ON Command RJ45')
                    panelStatus = 1;
                }

                if (connectionType == 'serial' || connectionType == 'both') {
                    for (let i=0; i < hosts.length ; i++) { sendcode(panelonhex)  };
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

//Reads the current state of the measurement and triggers changes to the screens
function readShellySwitch() {
    axios.get(shellySwitch + endpointSwitch)
    .then(function (response) {
        // handle success
        var p1 = response.data.meters[0].power;
        console.log(`Current Power on socketbar is ${p1}`)
        //console.log(`total: ${total} - Current Power: L1: ${l1}, L2: ${l2}, L3: ${l3}`);

        
        if (p1 <= threshold) {
            //console.log(`total: ${total} - Total is Low, Lights are off`)
            //console.log(panelStatus)

            if (panelStatus === 1)  {         
                if (connectionType == 'ethernet' || connectionType == 'both') {
                    for (let i=0; i < hosts.length ; i++) { sendRj(i,hosts, port, paneloffhex)  };
                    console.log('running Turn off Command RJ45')
                    panelStatus = 0;
                }

                if (connectionType == 'serial' || connectionType == 'both') {
                    for (let i=0; i < hosts.length ; i++) { sendcode(paneloffhex)  };
                    console.log('running Turn off Command Serial')
                    panelStatus = 0;
                }
            }
            else console.log('panel is already off');
        
        }

        if (p1 > threshold) {
            //console.log(`total: ${total} - Total is High, Lights are ON`)
            //console.log(panelStatus)
            //Call the MDC function to turn the screen ON , uncomment next line to activate
            if (panelStatus === 0)  {         
                if (connectionType == 'ethernet' || connectionType == 'both') {
                    for (let i=0; i < hosts.length ; i++) { sendRj(i,hosts, port, panelonhex)  };
                    console.log('running Turn ON Command RJ45')
                    panelStatus = 1;
                }

                if (connectionType == 'serial' || connectionType == 'both') {
                    for (let i=0; i < hosts.length ; i++) { sendcode(panelonhex)  };
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
        //readLux(); //Uncomment to have the brightness triggering On or Off
        //readShelly(); //Uncomment to have the Power consumption measu
        //readShellySwitch(); //Uncomment to have the Power consumption measured
        readVibration();    
        //readMovement(); //Uncomment to have the movement triggering On or Off
        timing = setTimeout(timer, interval)
        }
timer();

