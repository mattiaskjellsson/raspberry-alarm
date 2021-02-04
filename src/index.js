const express = require('express')
const Gpio = require('onoff').Gpio
const LED = new Gpio(4, 'out')

const app = express()
const port = 3000


app.get('/', (req, res) => {
  res.send('Hello world')
})

app.get('/high', (req, res) => {
  console.log('set gpio high')
  if (LED.readSync() === 0) {
    LED.writeSync(1)
    console.log('Tried and set GPIO 4 high')
  } else {
    console.log('Tried writing high, but ut was already there')
  }

  res.send('Gpio 4 set high')
})

app.get('/low', (req, res) => {
  console.log('set gpio low')

  if (LED.readSync() === 1) {
    LED.writeSync(0)
    console.log('Tried and set GPIO 4 low')
  } else {
    console.log('Tried writing low, but ut was already there')
  }

  res.send('Gpio 4 set low')
})

app.listen(port, () => {
  console.log(`Listen on port ${port}`)
})