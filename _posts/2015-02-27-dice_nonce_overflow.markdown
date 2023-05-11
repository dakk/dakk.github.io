---
layout: posts
title:  "Dices provably fair - Nonce overflow vulnerability "
date:   2015-02-27 00:00:01 +0200
categories: bitcoin
---
Most of bitcoin dice software use a system to prove the fair play of the server for each bet. Most of them implement this mechanism using two seed (server seed and client seed) combined with a session nonce in the aim to provide a fair random number for each bet and usually this nonce is initialized to 0 after each seed change.

But, what if this nonce is stored in an unsigned integer variable (32bit in 32bit systems, 2³² values)? Theorically after 2³²-1 bets, the nonce goes in overflow and return to 0.

Saving each bet roll for every play in the first 2³²-1 window, will provide a map function:

```f: n → roll . (n < 2³²)```

that could be used to declare a function g(m) that predicts every future roll:

```g (m) = f (m % 2³²)```

A simple fix for this problem is to regenerate the server seed and reset the nonce after 2³² bets.