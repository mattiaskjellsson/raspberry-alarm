const express = require('express')
const Gpio = require('onoff').Gpio
const { highAlarmOff, highAlarmOn, lowAlarmOn, lowAlarmOff} = require('./service')

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
  highAlarmOff()
  res.send(`High oxygen alarm off`)
})

app.get('/oxygen-low-alarm-off', (req, res) => {
  lowAlarmOff()
  res.send(`Low oxygen alarm off`)
})

app.get('/oxygen-high-alarm-on', (req, res) => {
  highAlarmOn()
  res.send(`High oxygen alarm on`)
})

app.get('/oxygen-low-alarm-on', (req, res) => {
  lowAlarmOn()
  res.send(`Low oxygen alarm on`)
})

app.listen(port, () => {
  console.log(`Listen on port ${port}`)
  lowOxygenGPIO.write(1, () => { console.log('Low oxygen alarm off')})
  highOxygenGPIO.write(1, () => { console.log('High oxygen alarm off')})
})

process.on('SIGINT', _ => {
  lowOxygenGPIO.unexport()
  highOxygenGPIO.unexport()
});