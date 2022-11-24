const Net = require('net');
const { SerialPort } = require('serialport')

function sendRj(num, hosts, port, hex) {
    setTimeout(function() {
        //console.log('Starting ', num, hosts[num], port );
		let obj = 'client' + num;
		//console.log(obj);
		obj = new Net.Socket();
		obj.connect({ port: port, host: hosts[num] } , () => {
		console.log(`TCP connection established with the screen ${hosts[num]} `);
		setTimeout( ()=> {
			obj.write(hex,  () => {
				obj.destroy();	
			   //console.log('wrote.')			
		 		});
		 	},200)			
		 });
		//console.log('Stopping ', num );
    }, 200);
}

//just for Test, to remove afterwards
const paneloffToSend = [0xAA, 0xF9, 0xFE, 0x01, 0x00, 0xF8]
var paneloffhex = new Uint8Array(paneloffToSend);
let cmd = Buffer.from(paneloffToSend)

function sendCode(msg) { 
    // Create a port
     const port = new SerialPort({
     path: '/dev/ttyAMA0',
     baudRate: 9600,
	 dataBits: 8,
	 stopBits: 1,
	 parity: 'none', 
     })

		port.write(msg, function(err) {
			if (err) {
			return console.log('Error on write: ', err.message)
			}
			console.log('message written')
			port.close(function () {
				     console.log('port Closed.');
				 });
		})


		port.on('readable', function () {
			console.log('Response:', port.read())
		  })
		  
		  // Switches the port into "flowing mode"
		port.on('data', function (data) {
		console.log('Data:', data)
		 })
    
     // Open errors will be emitted as an error event
     port.on('error', function(err) {
         console.log('ee: ', err.message)
     })
 };

//sendCode(paneloffhex)

exports.sendRj = sendRj
exports.sendcode = sendCode

