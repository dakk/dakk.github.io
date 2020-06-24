---
layout: post
title:  "MineML: F# miner"
date:   2013-08-28 10:59:28 +0200
categories: bitcoin
---
MineML is a multithread CPU based bitcoin miner written in F#. At the moment it’s a slow implementation, but the class structure offers the possibility to implement different type of MinerThread using different processing methods (opencl, cuda, or sha256 dedicated hardware).

The program structure is very simple: there’s a class (Program) that reads config file and creates the Miner object; the Miner object spawns MinerThread objects. At the moment there’s only the implementation for a CPU based thread, but will be possible to implement an opencl or cuda based thread.

Fork on [github](https://github.com/dakk/mineml)