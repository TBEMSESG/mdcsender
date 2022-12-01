# mdcsender


*Not for Productive environments - only for proof of concept - No warranty - no support*




Send MDC commands to a Samsung b2b Device

This app ready data from an external API to trigger Panel on or Panel off for one or more screens
The app uses MDC over RJ45 and/or Serial

In the case of this example, an external power meter is used to read current power consumption (eg. a lamp). If the power consumption is under a configurable threshold, the Panel of the screen is turned off.
We used Power consumption, but every other sensor is possible to use, like a PIR or ambient light sensor.

This node.js app can be used everywhere where there is currently no "middleware" to control the screen, like a meeting room in which we only need the screen on if someone is in the room.

Used hardware for this example: (this is only for reference, you can use every node.js running tool and every API providing sensor.



Raspberry Pi 4

https://www.digitec.ch/de/s1/product/raspberry-pi-4-2g-model-b-armv8-entwicklungsboard-kit-11267870
![image](https://user-images.githubusercontent.com/50730110/198819268-f0a1cb19-1b82-447a-a4fe-9f02b5afb71c.png)

Shelly 2.5

https://www.digitec.ch/de/s1/product/shelly-wlan-schaltaktor-25-automatisierung-13171777
![image](https://user-images.githubusercontent.com/50730110/205022478-fbdd2a47-757b-495a-a174-0c507d28cf9c.png)

Shelly EM

https://www.digitec.ch/de/s1/product/shelly-em-wifi-energy-meter-energiemessgeraet-12721529
![image](https://user-images.githubusercontent.com/50730110/205104189-41b2bc88-fad7-4795-9296-f20800732953.png)


Shelly em3

https://www.digitec.ch/de/s1/product/shelly-3em-energiemessgeraet-13175233
![image](https://user-images.githubusercontent.com/50730110/198819286-d6e91a64-86b2-49b0-a8d5-9fdf895029f4.png)

Shelly movement sensor

https://www.digitec.ch/de/s1/product/shelly-motion-2-automatisierung-21702706
![image](https://user-images.githubusercontent.com/50730110/198819346-6683417b-d81a-4518-ae87-159ae9ef3ca7.png)
