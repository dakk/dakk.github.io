---
layout: posts
title:  "Optimizing quantum circuit using boolean algebra"
date:   2024-03-05 16:00:01 +0200
categories: quantumcomputing
canonical_url: 
---

Since the latest v0.1.18 version, the [**Qlasskit**](https://github.com/dakk/qlasskit) library offers two useful tool for circuit analysis and optimization.

- *Decompiler*: given a quantum circuit is able to detect section that can be represented as boolean expressions

- *circuit_boolean_optimizer*: a pipeline that given a quantum circuit, decompose it in boolean expressions form and optimize it using boolean algebra

Let's have a look on how to use these features. We first create the following quantum circuit:

![](/assets/2024-03-05-qoptimize/unoptimized.png)

Now, using the *decompile* function we can detect "classical parts" and decode them as boolean expression; 
this is the result for the previous quantum circuit.

```python
dc = Decompiler().decompile(qcircuit)
```

```
DecompiledResults[
	(
		(0, 7)
		(X, [2], None), (CCX, [0, 2, 3], None), (CCX, [1, 3, 4], None), (CX, [4, 5], None), (CCX, [1, 3, 4], None), (CCX, [0, 2, 3], None), (X, [2], None)
		(q5, q4 ^ q5 ^ (q1 & (q3 ^ (q0 & ~q2))))
	)
]
```

Reading the resulting boolean expression `(q5, q4 ^ q5 ^ (q1 & (q3 ^ (q0 & ~q2))))`, and knowing that q0 and q1 are inputs, while the other qubits are used as ancilla and output qubits, it is clear that the circuit can be optimized.

```python
qc = circuit_boolean_optimizer(qf.circuit(), preserve=[0, 1])
```

The *circuit_boolean_optimizer* allows us to perform boolean optimizations in a quantum circuit; from the previous unoptimized example, we then get the following optimized circuit:

![](/assets/2024-03-05-qoptimize/optimized.png)



**Useful Links:**

The Python notebook for this blog post is available here: [](https://dakk.github.io/qlasskit/decompiler_and_optimizer.html)

- [Qlasskit library on github](https://github.com/dakk/qlasskit)
- [Qlasskit docs](https://dakk.github.io/qlasskit)
- [My Twitter Profile](https://twitter.com/dagide)