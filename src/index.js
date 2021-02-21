require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const Gpio = require('onoff').Gpio

const KEY = process.env.ALARM_KEY
const port = process.env.PORT
const HIGH_PIN = process.env.HIGH_PIN
const LOW_PIN = process.env.LOW_PIN

const highOxygenGPIO = new Gpio(HIGH_PIN, 'out')
const lowOxygenGPIO = new Gpio(LOW_PIN, 'out')

const app = express()
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const highAlarmOn = () => {
  console.log(`Turn on the high oxygen alarm`)
  pinValue(highOxygenGPIO, 0)
}

const highAlarmOff = () => {
  console.log(`Turn off the high oxygen alarm`)
  pinValue(highOxygenGPIO, 1)
}

const lowAlarmOn = () => {
  console.log(`Turn on the low oxygen alarm`)
  pinValue(lowOxygenGPIO, 0)
}

const lowAlarmOff = () => {
  console.log(`Turn off the low oxygen alarm`)
  pinValue(lowOxygenGPIO, 1)
}

const pinValue = (pin, val) => {
  if (pin.readSync() !== val) {
    pin.writeSync(val)
    console.log(`GPIO ${pin} set to ${val}`)
  } else {
    console.log(`GPIO ${pin} already set to ${val}`)
  }
  
  return `GPIO ${pin} set to ${val}`
}

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

app.post('/oxygen-low-alarm-off', (req, res) => {
  if (req.body.key === KEY) {
    lowAlarmOff()
    res.send(`Low oxygen alarm off`).status(200)
  } else {
    res.send(`Invalid key`).status(401)
  }
})

app.post('/oxygen-high-alarm-on', (req, res) => {
  if (req.body.key === KEY) {
    highAlarmOn()
    res.send(`High oxygen alarm on`).status(200)
  } else {
    res.send(`Invalid key`).status(401)
  }
})

app.post('/oxygen-low-alarm-on', (req, res) => {
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