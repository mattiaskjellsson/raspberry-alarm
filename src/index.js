
const express = require('express')
const Gpio = require('onoff').Gpio

const HIGH_PIN = 17
const LOW_PIN = 27
const port = 3000

const highOxygenGPIO = new Gpio(HIGH_PIN, 'out')
const lowOxygenGPIO = new Gpio(LOW_PIN, 'out')

const app = express()

app.get('/', (req, res) => {
  res.send('Hello world')
})

app.get('/oxygen-high-alarm-off', (req, res) => {
  console.log('Turn off high oxygen alarm')
  if (highOxygenGPIO.readSync() === 0) {
    highOxygenGPIO.writeSync(1)
    console.log(`GPIO ${HIGH_PIN} set to high`)
  } else {
    console.log(`GPIO ${HIGH_PIN} already high`)
  }

  res.send(`Gpio ${HIGH_PIN} set high`)
})

app.get('oxygen-high-alarm-on', (req, res) => {
  console.log(`Turn on the high oxygen alarm`)
  if (highOxygenGPIO.readSync() === 1) {
    highOxygenGPIO.writeSync(0)
    console.log(`GPIO ${HIGH_PIN} set to low`)
  } else {
    console.log(`GPIO ${HIGH_PIN} already low`)
  }

  res.send(`Gpio ${HIGH_PIN} set low`)
})

app.get('/oxygen-low-alarm-off', (req, res) => {
  console.log('Turn off high oxygen alarm')
  if (lowOxygenGPIO.readSync() === 0) {
    lowOxygenGPIO.writeSync(1)
    console.log(`GPIO ${LOW_PIN} set to high`)
  } else {
    console.log(`GPIO ${LOW_PIN} already high`)
  }

  res.send(`Gpio ${LOW_PIN} set high`)
})

app.get('oxygen-low-alarm-on', (req, res) => {
  console.log(`Turn on the high oxygen alarm`)
  if (lowOxygenGPIO.readSync() === 1) {
    lowOxygenGPIO.writeSync(0)
    console.log(`GPIO ${LOW_PIN} set to low`)
  } else {
    console.log(`GPIO ${LOW_PIN} already low`)
  }

  res.send(`GPIO ${LOW_PIN} set low`)
})

app.listen(port, () => {
  console.log(`Listen on port ${port}`)
})

process.on('SIGINT', _ => {
  lowOxygenGPIO.unexport()
  highOxygenGPIO.unexport()
});