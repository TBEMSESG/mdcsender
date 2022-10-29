# mdcsender

Send MDC commands to a Samsung b2b Device

This app ready data from an external APi to trigger Panel on or Panel off for one or more screens
The app uses MDC over RJ45 and/or Serial

In the case of this example, an external power meter is used to read current power consumption (eg. a lamp). If the power consumption is under a configurabel threshold, the Panel of the screen is turned off.
We used Powerconsumption, but every other sensor is possible to use, like a PIR or ambient light sensor.

This app can be uses everywhere there is currently no "middleware" to control the screen, like a meeting room in which we only need the screen on if someone is in the room.

Used hardware for this example: 
Raspberry Pi 4
![image](https://user-images.githubusercontent.com/50730110/198819268-f0a1cb19-1b82-447a-a4fe-9f02b5afb71c.png)

Shelly em3
![image](https://user-images.githubusercontent.com/50730110/198819286-d6e91a64-86b2-49b0-a8d5-9fdf895029f4.png)
