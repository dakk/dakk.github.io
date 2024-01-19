---
layout: posts
title:  "Solving Sudoku Puzzles on a Quantum Computer"
date:   2024-01-19 11:19:01 +0200
categories: quantumcomputing
canonical_url: https://medium.com/@dakk/solving-sudoku-on-a-quantum-computer-b523a7cc2eff
---

Today, I'm going to show you how to use *Qlasskit* to create a quantum circuit able to search for 
[Sudoku puzzle](https://it.wikipedia.org/wiki/Sudoku) solutions. 

[*Qlasskit*](https://github.com/dakk/qlasskit), is an open-source Python library developed with the support of a Unitary Fund microgrant, addresses this challenge head-on by allowing direct translation of standard Python code into invertible quantum circuits without any modification to the original code.

Using qlasskit for this use case, will allow us to write and execute a quantum circuit, writing
only python code without any quantum related primitives.

Since current quantum computers are very limited machines, we cannot solve a real 9x9 sudoku puzzle; our 
toy examples uses a 2x2 matrix where a valid solution is when in every row and every column there are no 
repeated values (`0` or `1`). We encode these xor-ing the values for each row and column. 

Since we want a specific solution, we add a constraint `constr`: we want the `[0][0]` element to be `True`.


```python
from qlasskit import qlassf, Qmatrix
from qlasskit.algorithms import Grover


@qlassf
def sudoku_check(m: Qmatrix[bool, 2, 2]) -> bool:
    constr = m[0][0]
    sub0 = m[0][0] ^ m[0][1]
    sub1 = m[1][0] ^ m[1][1]
    sub2 = m[0][0] ^ m[1][0]
    sub3 = m[0][1] ^ m[1][1]
    return sub0 and sub1 and sub2 and sub3 and constr
```

Now that we have an oracle, we can instantiate the Grover search algorithm:

```python
q_algo = Grover(sudoku_check)
```

Then we use our prefered framework and simulator for sampling the result; this is an example using `qiskit` with `aer_simulator`.

We obtain that the solution for this puzzle is the matrix `[[True, False], [False, True]]`.


```python
from qiskit import Aer, QuantumCircuit, transpile
from qiskit.visualization import plot_histogram

qc = q_algo.export("qiskit")
qc.measure_all()
simulator = Aer.get_backend("aer_simulator")
circ = transpile(qc, simulator)
result = simulator.run(circ).result()
counts = result.get_counts(circ)

counts_readable = q_algo.decode_counts(counts, discard_lower=20)

plot_histogram(counts_readable)
```


![](/assets/2024-01-19-qsudoku/sudoku_counts.png)


We can exploit *matplotlib* for drawing the result sudoku matrix as follows:

```python
import matplotlib.pyplot as plt

def draw_matrix(matrix):
    fig, ax = plt.subplots()
    ax.matshow(matrix, cmap='viridis')

    for i in range(len(matrix)):
        for j in range(len(matrix[0])):
            ax.text(j, i, str(matrix[i][j]), va='center', ha='center', fontsize=12, color='black')

    plt.show()
    
m_res = list(filter(lambda x: x[1] > 500, counts_readable.items()))[0][0]
draw_matrix(m_res)
```

![](/assets/2024-01-19-qsudoku/sudoku_matrix.png)


We can create a more realistic sudoku game using numbers instead of booleans, but the resources required will scale exponentially. In the following code snippets, we recreate `sudoku_check` using `Qint2` and a 4x4 matrix. The sum of each column and row must be equal to 6 (3+2+1+0). As we can see, the resulting circuit of the checker requires more than 100 qubits, way above our simulation capabilities.

```python
from qlasskit import Qint2, Qint4

@qlassf
def sudoku_check(m: Qmatrix[Qint2, 4, 4]) -> bool:
    res = True

    # Constraints
    res = (m[0][2] == 3) and (m[0][0] == 1)

    # Check every row and column
    for i in range(4):
        c = (Qint4(0) + m[i][0] + m[i][1] + m[i][2] + m[i][3]) == 6
        r = (Qint4(0) + m[0][i] + m[1][i] + m[2][i] + m[3][i]) == 6
        res = res and c and r

    return res

print(sudoku_check.circuit())
```

```
QCircuit<sudoku_check>(1309 gates, 178 qubits)
```