
- GPIO 17, green led for high oxygen.
 When the measured oxygen level is higher than the set high limit
   this GPIO shall go low, that is shut the diode off.
 When the measured value is lower thant the set high limit
   this GPIO shall go high, that is turn the diode on.
- GPIO 27, red led for low oxygen.
 When the measuder oxygen level is lower than the set low limit
   this GPIO shall go low, that is shut the diode off.
 When the measured value is higher than the set low limit
   this GPIO shall go high, that is turn this led on.


- Usage.

0. Hook up GPIO pins 17 and 27 to whatever is supposed to be controlled. Nothing to heavy though.
1. Download the sourcecode
2. npm install
3. npm start