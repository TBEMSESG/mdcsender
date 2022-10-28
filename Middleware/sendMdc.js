const Net = require('net');


function sendRj(num, hosts, port, hex) {
    setTimeout(function() {
        console.log('Starting ', num, hosts[num], port );
		let obj = 'client' + num;
		console.log(obj);
		obj = new Net.Socket();
		obj.connect({ port: port, host: hosts[num] } , () => {
		console.log(`TCP connection established with the screen ${hosts[num]} `);
		setTimeout( ()=> {
			obj.write(hex,  () => {
				obj.destroy();	
			   console.log('wrote.')			
		 		});
		 	},200)			
		 });
		console.log('Stopping ', num );
    }, 200);
}


exports.sendRj = sendRj

