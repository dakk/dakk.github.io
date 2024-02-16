---
layout: posts
title:  "Factorization using Qlasskit and DWave Quantum Annealer"
date:   2024-02-16 10:28:01 +0200
categories: quantumcomputing
canonical_url: 
---

In the last release of *Qlasskit*, I introduced a new feature able to export a `qlassf` function to a binary quadratic model (as bqm, qubo or ising model). 
This feature introduces *qlasskit* to the realm of quantum annealer like the ones manufactered by DWave; in this blog post, we'll explore this 
new feature, using Qlasskit and the DWave quantum annealer for prime factorization.

![](/assets/2024-02-16-annealing_factorization.jpg)

Instead of employing the traditional *Shor algorithm* utilized in circuit-base quantum computers, we opt to frame our problem as a minimization problem
and we exploit the *adiabatic quantum computing* for searching a solution.


We begin defining a Qlasskit function called `test_factor_generic` which takes the number `num` to be factorized along with its two factors `a` and `b` as inputs. 
It returns 0 if `a` multiplied by `b` equals `num`.


```python
from qlasskit import qlassf, Qint4, Qint3, Parameter

@qlassf
def test_factor_generic(num: Parameter[Qint4], a: Qint3, b: Qint3) -> Qint4:
    return num - (a * b)
```

Next, we bind the `num` parameter to the number 15 and convert the Qlasskit function to a binary quadratic model (BQM) using the `to_bqm` function.

```python
test_factor = test_factor_generic.bind(num=15)
bqm = test_factor.to_bqm()
```

This BQM represents the optimization problem of finding the factors of 15.


## Running the sampler

With our problem encoded into a BQM, we're now poised to execute it on a real quantum annealer. Here's how:

```python
from dwave.system import DWaveSampler, EmbeddingComposite
from qlasskit.bqm import decode_samples

sampler = EmbeddingComposite(DWaveSampler())
sampleset = sampler.sample(bqm, num_reads=10)
decoded_samples = decode_samples(test_factor, sampleset)
best_sample = min(decoded_samples, key=lambda x: x.energy)
print(best_sample.sample)
```

This code snippet runs the BQM on a **DWave** quantum annealer and prints the best solution found, which, as expected, yields ```{'a': 3, 'b': 5}```, since 5 times 3 equals 15.

If you don't have access to a DWave account, you can still run smaller problems like this one using a simulated annealing sampler as follows:


```python
import neal

sa = neal.SimulatedAnnealingSampler()
sampleset = sa.sample(bqm, num_reads=10)
decoded_samples = decode_samples(test_factor, sampleset)
best_sample = min(decoded_samples, key=lambda x: x.energy)
print(best_sample.sample)
```

## Conclusion

In this post, we've demonstrated how to leverage Qlasskit and the DWave quantum annealer to factorize a number. Although this example is relatively straightforward, it underscores the potential of the qlasskit library in describing optimization problems using high-level abstractions.

If you have any questions, please don't hesitate to leave a comment below!

