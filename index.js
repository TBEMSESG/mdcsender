const { SerialPort } = require('serialport')

// Create a port
const port = new SerialPort({
  path: '/dev/ttyAMA0',
  baudRate: 9600,
})