const { SerialPort } = require('serialport')


const hdmi1ToSend = [0xAA, 0x14, 0xFE, 0x01, 0x21, 0x34]
var hdmi1hex = new Uint8Array(hdmi1ToSend);
const miToSend = [0xAA, 0x14, 0xFE, 0x01, 0x60, 0x73]
var mihex = new Uint8Array(miToSend);
const poweronToSend = [0xAA, 0x11, 0xFE, 0x01, 0x01, 0x11]
var poweronhex = new Uint8Array(poweronToSend);
const poweroffToSend = [0xAA, 0x11, 0xFE, 0x01, 0x00, 0x10]
var poweroffhex = new Uint8Array(poweroffToSend);



function sendCode(msg) { 
    // Create a port
    const port = new SerialPort({
    path: '/dev/ttyAMA0',
    baudRate: 9600,
    })


    port.write(msg, function(err) {
        if (err) {
        return console.log('Error on write: ', err.message)
        }
        console.log('message written')
    })
    
    // Open errors will be emitted as an error event
    port.on('error', function(err) {
        console.log('Error: ', err.message)
    })
};