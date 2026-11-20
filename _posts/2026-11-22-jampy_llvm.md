---
layout: posts
title:  "Jampy and its PVM"
date:   2026-11-20 12:01:00 +0200
categories: blockchain, jam
canonical_url: 
---


## Background

July 2024; surfing the internet I came across the [Graypaper](https://graypaper.com/), the last idea of Gavin Wood. 
The graypaper describes a new blockchain protocol called JAM, I won't explain here, but in two words it proposes a novel 
approach for scaling while keeping state coherency. JAM allows executing "services" (JAM smart contracts), but unlike 
Ethereum and other chains where a custom VM is specifically created, JAM implements its VM (the PVM) based on the RISC-V 
instruction set (rv64em variant).

Alongside the paper, the Web3 Foundation put [10M dot](https://jam.web3.foundation/) at stake divided into 5 milestones 
for financing multiple clean-room open-source implementations of the same protocol, in different languages. 

A challenging open-source long-term project plus a financial incentive was the perfect recipe for me, so I started the
development of **Jampy**, a Python implementation of the graypaper. 

In 2026, I finally achieved the first milestone, and now I'm heading to the second. While the second milestone requires 
having a conformant node, milestones third and fourth require specific performances.

### Rule 9

After a few months working on Jampy, I proposed to introduce rule 9:

> Generative AI must not be used in any substantive way.

The rationale is simple, if LLMs are trained on the same source code, there is a probability that they can introduce the 
same bugs and mistakes in multiple implementations, invalidating the clean-room requirement. 
Don't get me wrong, I'm not against LLMs.


## PVM

The most critical part of JAM performance is the execution of the PVM, so the approach used to execute JAM services is crucial
for the later milestones.
In Jampy I implemented 3 different approaches, that currently are all available in the source code. 

### Interpreter

I obviously started
from the easiest one, the interpreter: fundamentally a loop where I get the opcode at the current program counter,
parse the arguments, and exec its semantics updating the PVM state.

Every ISA instruction has its own class that describes it, plus an exec function which receives the current state
and updates it. This is an example showing the abstraction I used, it is basically a static class holding all the
information; probably it is not the most efficient way, but the abstraction is elegant and the code is pretty in my opinion.

```python
@instr(149, "add_imm_64", n_reg=2, n_imm=1, decoder=_decode_2reg_1imm, source_dest_regs=([1], [0]))
class InsAddImm64(Instr):
    @staticmethod
    def exec(pc: int, regs: list[int], mem: Memory, prog: Program, args: tuple[int, int, int]) -> None:
        ra, rb, vx = args
        regs[ra] = cast_64(regs[rb] + vx)
```


### JIT

The interpreter version worked fine, but the first milestone was approaching and even if the performance was not taken
into consideration, my software will be tested with more than 1 million of blocks, so PVM performance will lead how much
time will it take to finish.

So I have considered several ideas for improving the speed of the interpreter, I reduced bootlenecks in memory access, cached
decoded instructions, some rewrites in Cython, and more. 
The natural next step would be a native recompiler, but before doing so, I exploited the introspection of Python, that allowed
me to create and execute a custom AST directly at execution time. The bare interpreter version of Jampy PVM performs a function
call to `exec` for each opcode executed; so I wrote an AST rewriter that gets the list of all the instruction in the block
we are going to execute, and merge all of them in a single unrolled function. So instead of having `n` function calls
we only have one. Those new "block functions" are also cached, so the operation is performed once, and just on demand.

The edit needed for this improvement is surprisingly simple, the `ast_fuse_funcs` basically iterates over instructions and 
append the opcode semantics in a new function body.


```python
merged_f = ast_fuse_funcs("exec", instr_list)

merged_f(pc, regs, mem, prog)
```


### Recompilation

Milestone 1 passed, the networking stuff is almost ready, so I can spend some more time on the performance optimization.
As I told before, the natural next step is running PVM code as native code, so I need to translate PVM programs
to native code, and execute it. So instead of executing the opcode, I want it to emit some sort of native code. 
For simplicity I chose to use LLVM, so I first rewrote the PVM to LLVM-IR and then compiled it to a native executable.
My ISA abstraction comes to help, so I just added an emit method, which emits IR code.


```python
@instr(149, "add_imm_64", n_reg=2, n_imm=1, decoder=_decode_2reg_1imm, source_dest_regs=([1], [0]))
class InsAddImm64(Instr):
    @staticmethod
    def exec(pc: int, regs: list[int], mem: Memory, prog: Program, args: tuple[int, int, int]) -> None:
        ra, rb, vx = args
        regs[ra] = cast_64(regs[rb] + vx)

    @staticmethod
    def emit(builder: IRBuilder, ctx: EmitContext, args: tuple[int, int, int], pc: int) -> None:
        ra, rb, vx = args
        src = builder.load(ctx.regs[rb], name=f"r{rb}")
        result = builder.add(src, ctx.i64(vx), name="add_imm64")
        builder.store(result, ctx.regs[ra])
```

The approach is now different from JIT, and when a new program spawns in the chain, I recompile it entirely and cache the
executable in memory and on disk. While compiling, the JIT executor is used, so there are no delays.


### Results

The result of the recompilation is impressive; there is no comparison with other approaches.
These are the results of executing a heavy load program:

| Executor  | Time |
|---|---|
| Interpreter  | 12m 55s |
| JIT  | 10m 50s |
| LLVM recompiler  | 16s |

