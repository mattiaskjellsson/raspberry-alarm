require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const Gpio = require('onoff').Gpio

const { highAlarmOff, highAlarmOn, lowAlarmOn, lowAlarmOff} = require('./service')

const KEY = process.env.ALARM_KEY
const HIGH_PIN = 17
const LOW_PIN = 27
const port = 3000

const highOxygenGPIO = new Gpio(HIGH_PIN, 'out')
const lowOxygenGPIO = new Gpio(LOW_PIN, 'out')

const app = express()
app.use(bodyParser.json())

app.get('/', (req, res) => {
  res.send('Hello world')
})

app.post('/oxygen-high-alarm-off', (req, res) => {
  if (req.body.key === KEY) {
    highAlarmOff()
    res.send(`High oxygen alarm off`).status(200)
  } else {
    res.send(`Invalid key`).status(401)
  }
})

app.get('/oxygen-low-alarm-off', (req, res) => {
  if (req.body.key === KEY) {
    lowAlarmOff()
    res.send(`Low oxygen alarm off`).status(200)
  } else {
    res.send(`Invalid key`).status(401)
  }
})

app.get('/oxygen-high-alarm-on', (req, res) => {
  if (req.body.key === KEY) {
    highAlarmOn()
    res.send(`High oxygen alarm on`).status(200)
  } else {
    res.send(`Invalid key`).status(401)
  }
})

app.get('/oxygen-low-alarm-on', (req, res) => {
  if (req.body.key === KEY) {
    lowAlarmOn()
    res.send(`Low oxygen alarm on`).status(200)
  } else {
    res.send(`Invalid key`).status(401)
  }
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