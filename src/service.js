export const highAlarmOn = () => {
  console.log(`Turn on the high oxygen alarm`)
  const result = pinValue(highOxygenGPIO, 0)
  return result
}

export const highAlarmOff = () => {
  console.log(`Turn off the high oxygen alarm`)
  const result = pinValue(highOxygenGPIO, 1)
  return result
}

export const lowAlarmOn = () => {
  console.log(`Turn on the low oxygen alarm`)
  const result = pinValue(lowOxygenGPIO, 0)
  return result
}

export const lowAlarmOff = () => {
  console.log(`Turn off the high oxygen alarm`)
  const result = pinValue(lowOxygenGPIO, 1)
  return result
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