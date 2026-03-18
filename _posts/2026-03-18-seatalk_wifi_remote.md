---
layout: posts
title:  "A Cheap Sailboat Autopilot WiFi Remote Using ESP32"
date:   2026-03-18 13:40:00 +0200
categories: sailing
canonical_url: https://medium.com/@dakk/a-cheap-sailboat-autopilot-wifi-remote-using-esp32-021acd06a265
---

![Remote for sailing autopilot](/assets/2026-03-18-seatalk_wifi_remote/2026-02-15 16.13.25.jpg)

In my spare time, I like to go out with my sailboat. I also frequently sail solo,
and even if not mandatory, it would be useful to be able to control the direction 
of the autopilot from every point of the sailboat.

The "official" remote for my autopilot is the [Raymarine S100](https://www.raymarine.com/it-it/i-nostri-prodotti/autopiloti/unita-di-controllo-dell-autopilota/s100), which costs 600€; it is too much in my opinion, so I continued sailing without.

In 2021 I did my first try to overcome this cost, by creating a DIY device; the solution was an arduino, with an opto-coupled Seatalk1 interface,
and a 433 MHZ receiver plus a tiny 433 MHZ transmitter.

[![433MHZ auto pilot remote](https://img.youtube.com/vi/FmDsRqO7LVc/0.jpg)](https://www.youtube.com/watch?v=FmDsRqO7LVc)

It worked, but it had 3 major flaws:
- it was occupying the only available Seatalk1 port left
- sometimes the signal is not received by the autopilot
- the remote doesn't have feedback since the communication is one-way

So after some months I removed it, and I used the Seatalk1 port to connect a [wifi gateway](https://www.vela-navega.com/index.php/nmea3wifi) from vela-navega.com, that allowed me to broadcast all instruments data through wifi.

I was happy with it since it allowed me to connect wind, depth, gps and AIS with my laptop and mobile phone. But one day 
the idea of an autopilot remote came back, but this time I wanted to exploit the wifi gateway for it.

The first thing to do was to try to send Seatalk1 autopilot sentences using netcat, directly to the wifi gateway; and surprise, it worked. 
The nmea183 sentences are translated and sent to the seatalk bus, and received by the autopilot.

![Seatalk reverse](/assets/2026-03-18-seatalk_wifi_remote/2026-01-15 15.45.41.jpg)

So in a week I created a simple PCB with 6 buttons, an ESP32 and a 1860 lithium battery. Then I created a simple enclosure for it:

![Pieces](/assets/2026-03-18-seatalk_wifi_remote/2026-02-25 12.55.02.jpg)
![Open](/assets/2026-03-18-seatalk_wifi_remote/2026-02-15 15.35.29.jpg)

The software is really easy; it connects to the gateway wifi, and when the user presses a button, it sends the sentence back to the gateway. If 
the remote is not utilized for more than 20 minutes, it goes to sleep.

Surprisingly it worked like a charm at the first try! The reception distance allows me to use it in every part of the boat without issues, and I can
also add some feedback to the remote, since we can process nmea sentences from all the boat instruments.

[![Wifi remote](https://img.youtube.com/vi/2ZebOkx1Vrc/0.jpg)](https://www.youtube.com/watch?v=2ZebOkx1Vrc)


This is the first iteration of the project, and I'm already planning a new smaller version with only 3 buttons; maybe in the future I will also
add a screen.


The code and the enclosure design are open-source, follow the project to stay up to date with future iterations: [github.com/dakk/seatalk-wifi-remote](https://github.com/dakk/seatalk-wifi-remote)