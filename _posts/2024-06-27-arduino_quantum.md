---
layout: posts
title:  "Quantum Computing on Arduino"
date:   2024-06-27 16:49:00 +0200
categories: quantumcomputing
canonical_url: 
---

![Arduino QC running random circuit](/assets/2024-06-28-arduino_quantum/blinking.gif)

In a world where tech giants are pouring billions into quantum computing, spending fortunes on superconducting circuits and cryogenic cooling systems, I decided to take a slightly different approach. Armed with nothing more than an Arduino Uno (actually a much cheaper Elegoo Uno), a handful of LEDs, and an unquenchable thirst for quantum supremacy, I've created a quantum emulator that will make those fancy-pants quantum computers shake in their expensively cooled boots.

I present to you: the Arduino Quantum Computer. With a whopping 7 qubits, this powerhouse of quantum computation fits in the palm of your hand and runs at room temperature. Take that, dilution refrigerators!

![Arduino QC running at room temperature](/assets/2024-06-28-arduino_quantum/room_temperature_arduino.jpg)

Now, you might be thinking, "But wait, doesn't Google's Sycamore processor have 53 qubits? And isn't IBM's latest quantum computer boasting 433 qubits?" Well, sure, if you want to get all technical about it. But let me ask you this: can their quantum computers blink LEDs? I didn't think so.

Our plucky Arduino quantum emulator supports all your favorite quantum gates: Hadamard, CNOT, X, Y, S, T and Z. It can even prepare a GHZ state faster than you can say "quantum entanglement" (assuming you say it really, really slowly).

```cpp
H(0);  
for(int i = 0; i < NUM_QUBITS - 1; i++) {
  CX(i,i+1);
}
```

![Arduino QC GHZ state](/assets/2024-06-28-arduino_quantum/ghz.gif)

The best part? While those other quantum computers require teams of PhD physicists to operate, our Arduino quantum emulator can be programmed by anyone with a basic understanding of C++ and a complete disregard for actual quantum mechanics.

But wait, there's more! Unlike those other quantum computers that need to be isolated from all external interference, our Arduino quantum computer thrives on noise. In fact, it uses the *analog noise* from an unconnected pin to seed its random number generator. It's not a bug, it's a feature!

```cpp
randomSeed(analogRead(0));
```

Now, I know what you're thinking: "This is revolutionary! How much does it cost?" Well, prepare to be amazed. While other quantum computers cost millions, you can build this quantum powerhouse for the low, low price of about $25 (or $10 if you buy a cheaper Elegoo). That's right, for the cost of a nice dinner, you too can join the quantum computing revolution.

In conclusion, while other researchers waste their time with trivial problems like factoring large numbers or simulating complex quantum systems, we'll be over here, blinking LEDs in superposition. The future of quantum computing is here, and it runs on 5 volts.

Code is open-source and available on the following [github repository](https://github.com/dakk/arduino-quantum-emulator) under Apache License.

Check out also my [Commodore64 quantum emulator](https://github.com/dakk/qc64).

*Disclaimer: This quantum emulator may not actually solve any real-world problems faster than a classical computer. But hey, neither do most other quantum computers right now, so we're in good company!*
