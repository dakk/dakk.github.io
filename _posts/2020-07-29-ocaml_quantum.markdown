---
layout: posts
title:  "OCaml and Quantum Computing"
date:   2020-07-29 11:00:28 +0200
categories: quantum
---
Qiskit is a python SDK developed by IBM and allows everyone to create quantum circuits, simulate them locally and also run the quantum circuit on a real quantum computer. Qiskit is a very good environment for moving first steps in QC: it’s powerful, but simple at the same time; furthermore it provides many learning resources (ie: the textbook and Abraham (Abe) Asfaw youtube tutorials).

Qiskit is usable only with Python at the moment (since the whole library is written using this language); Python is a really good language for this kind of libraries, since its syntax is clear, and the learning time for this language is usually really short.

Nevertheless I want to use Ocaml language for my quantum experiments, so I started to write a binding library from Qiskit to OCaml, and today I released the library on opam (install via opam install qiskit). At the moment the library allows to write simple quantum circuits, simulate them locally and run them on IBM quantum computers.

The source code is available here while the docs are here.

Let’s see a short example:

```ocaml
open Qiskit

(* Create the circuit *)
let qc = quantum_circuit 2 2 
  |> h 0 
  |> id 1 
  |> barrier
  |> cx 0 1
  |> barrier
  |> measure 0 0
  |> measure 1 1
  |> draw;;

(* Start a simulation *)
Aer.get_backend "qasm_simulator" 
  |> execute qc 
  |> result 
  |> get_counts 
  |> Visualization.plot_histogram;

(* Run the circuit on real quantum hardware *)
let prov = IBMQ.enable_account "IBMQ_API_KEY" in
let j = Provider.get_backend "ibmq_london" prov |> execute qc in
Tools.Monitor.job_monitor j;
j 
  |> result 
  |> get_counts 
  |> Visualization.plot_histogram;;
```


If you liked caml_qiskit, please put a star on [github.com/dakk/caml_qiskit](https://github.com/dakk/caml_qiskit)

Article on [medium](https://medium.com/@dakk/ocaml-and-quantum-computing-fcf4b60d3159).