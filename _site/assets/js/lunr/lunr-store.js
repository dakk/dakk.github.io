var store = [{
        "title": "MineML: F# miner",
        "excerpt":"MineML is a multithread CPU based bitcoin miner written in F#. At the moment it’s a slow implementation, but the class structure offers the possibility to implement different type of MinerThread using different processing methods (opencl, cuda, or sha256 dedicated hardware). The program structure is very simple: there’s a class...","categories": ["bitcoin"],
        "tags": [],
        "url": "/bitcoin/2013/08/28/mineml_miner.html",
        "teaser": null
      },{
        "title": "Apache2: redirect different domains to subfolder",
        "excerpt":"In the aim to merge two of my server on digitalocean, today I tried to write a mod_rewrite rule to redirect a secondary domain to a subfolder. After one hour, I found that I can do that with a VirtualHosts. Just edit the file /etc/apache2/sites-available/default and add a rule for...","categories": ["sys"],
        "tags": [],
        "url": "/sys/2014/05/04/apache2_subfolder_redirect.html",
        "teaser": null
      },{
        "title": "Dices provably fair - Nonce overflow vulnerability ",
        "excerpt":"Most of bitcoin dice software use a system to prove the fair play of the server for each bet. Most of them implement this mechanism using two seed (server seed and client seed) combined with a session nonce in the aim to provide a fair random number for each bet...","categories": ["bitcoin"],
        "tags": [],
        "url": "/bitcoin/2015/02/26/dice_nonce_overflow.html",
        "teaser": null
      },{
        "title": "Contractvm: decentralized applications on Bitcoin",
        "excerpt":"Contractvm is a general-purpose decentralized framework based on blockchain. The framework allows to implement arbitrary decentralized applications in an easy way, providing the necessary abstraction layer. Contractvm dapps are executed in an open network of nodes that perform computations by processing dapp interactions stored in messages. All messages are securely...","categories": ["bitcoin"],
        "tags": [],
        "url": "/bitcoin/2016/01/11/contractvm.html",
        "teaser": null
      },{
        "title": "New blog",
        "excerpt":"This is my new blog, based on jekyll. I’ll soon import old posts from my old blog.  ","categories": ["random"],
        "tags": [],
        "url": "/random/2020/06/24/new_blog.html",
        "teaser": null
      },{
        "title": "Favorite dev quote",
        "excerpt":"   Documentation is like sex: when it is good, it is very, very good; and when it is bad, it is better than nothing   ","categories": ["random"],
        "tags": [],
        "url": "/random/2020/06/24/favorite_quote.html",
        "teaser": null
      },{
        "title": "King of Tezos: a smart-ponzi on Tezos",
        "excerpt":"While writing a new programming language, it is often useful to write some real use-cases to test the syntax, the language expressiveness and the code cleanness comparing to other languages. So I did for yallo-lang, a (still experimental) smart contract language for Tezos; for starting I chose a contract already...","categories": ["tezos"],
        "tags": [],
        "url": "/tezos/2020/06/24/king_of_tezos.html",
        "teaser": null
      },{
        "title": "Yallo, a new Tezos language",
        "excerpt":"As someone noticed from the previous post, last weeks I started to write a new programming language for Tezos smart contracts. This project was initially intended as a personal exercise for studying parsers, ast and other compiler’s things, but the code just go out of hand very quickly. The joke...","categories": ["tezos"],
        "tags": [],
        "url": "/tezos/2020/07/07/yallo_a_new_tezos_language.html",
        "teaser": null
      },{
        "title": "OCaml and Quantum Computing",
        "excerpt":"Qiskit is a python SDK developed by IBM and allows everyone to create quantum circuits, simulate them locally and also run the quantum circuit on a real quantum computer. Qiskit is a very good environment for moving first steps in QC: it’s powerful, but simple at the same time; furthermore...","categories": ["quantum"],
        "tags": [],
        "url": "/quantum/2020/07/29/ocaml_quantum.html",
        "teaser": null
      },{
        "title": "Ship detection from Sentinel-2 satellite images",
        "excerpt":"A few days ago I came across a yt video discussing the ESA Copernicus program, a European initiative for monitoring earth via a satellite constellation. This constellation is composed of numerous satellites called Sentinels, which scan the Earth daily for different parameters. What astonished mew as the fact that all...","categories": ["ml"],
        "tags": [],
        "url": "/ml/2023/05/15/sentinel_ship_detection.html",
        "teaser": null
      },{
        "title": "Free near real-time 10-meter resolution satellite imagery with 5 lines of code",
        "excerpt":"Satellite imagery has been a game-changer in many fields, from meteorology and environmental sciences to city planning and real estate. The ability to look at our planet from above offers insights that ground-based observation cannot provide. However, accessibility to such high-resolution imagery has often been perceived as costly and complicated....","categories": ["python"],
        "tags": [],
        "url": "/python/2023/05/24/sentinelsat_download.html",
        "teaser": null
      },{
        "title": "My Journey at the UnitaryHack Hackathon: A Quantum Computing Adventure",
        "excerpt":"This June I emerged as one of the top participants with 9 bounties collected (alongside another exceptional contributor) in the #UnitaryHack Hackathon, hosted by the Unitary Fund. For those unfamiliar, the UnitaryHack Hackathon is an event that gathers quantum computing enthusiasts from across the globe to work together and address...","categories": ["quantum-computing"],
        "tags": [],
        "url": "/quantum-computing/2023/05/24/unitaryhack.html",
        "teaser": null
      },{
        "title": "Quantum Computing on a Commodore 64 in 200 Lines of BASIC",
        "excerpt":"In an age where companies are selling two-qubit quantum computers for a sum of money that would make your wallet recoil in horror, here we are, stepping off the beaten path and walking down memory lane to a time when computers were, well, somewhat simpler. Join me on this delightful...","categories": ["quantumcomputing"],
        "tags": [],
        "url": "/quantumcomputing/2023/07/02/qc64.html",
        "teaser": null
      },{
        "title": "Qlasskit - a bridge between Python and Quantum algorithms",
        "excerpt":"Traditionally, creating quantum circuits requires specialized knowledge in quantum programming. This requirement holds true when encoding a classical algorithm inside a quantum circuit, for instance, for an oracle or a black-box component of a quantum algorithm. This often becomes a time wasting job, since we almost always already have a...","categories": ["quantumcomputing"],
        "tags": [],
        "url": "/quantumcomputing/2023/11/29/qlasskit.html",
        "teaser": null
      },{
        "title": "Expanding the Commodore 64 Quantum Emulator",
        "excerpt":"In a recent article I wrote, “Quantum Computing on a Commodore 64 in 200 Lines of BASIC”, published both on Medium and Hackaday.com, shows a two-qubit quantum circuit emulator on the venerable Commodore 64, writing only 200 lines of code. The source code, available on GitHub, sparked a flurry of...","categories": ["quantumcomputing"],
        "tags": [],
        "url": "/quantumcomputing/2023/12/13/qc64_followup.html",
        "teaser": null
      },{
        "title": "Solving Sudoku Puzzles on a Quantum Computer",
        "excerpt":"Today, I’m going to show you how to use Qlasskit to create a quantum circuit able to search for Sudoku puzzle solutions. Qlasskit, is an open-source Python library developed with the support of a Unitary Fund microgrant, addresses this challenge head-on by allowing direct translation of standard Python code into...","categories": ["quantumcomputing"],
        "tags": [],
        "url": "/quantumcomputing/2024/01/19/quantum_sudoku.html",
        "teaser": null
      },{
        "title": "The Time I Built a Probabilistic Computer",
        "excerpt":"In early 2023, I embarked on a journey to explore the field of probabilistic computing. This endeavor culminated in the construction of a hardware prototype, and this is its story. The evolution of unconventional computing models, from the analog computing of yesteryears to the promises of quantum computing, has opened...","categories": ["unconventionalcomputing"],
        "tags": [],
        "url": "/unconventionalcomputing/2024/01/31/pbits.html",
        "teaser": null
      },{
        "title": "Factorization using Qlasskit and DWave Quantum Annealer",
        "excerpt":"In the last release of Qlasskit, I introduced a new feature able to export a qlassf function to a binary quadratic model (as bqm, qubo or ising model). This feature introduces qlasskit to the realm of quantum annealer like the ones manufactered by DWave; in this blog post, we’ll explore...","categories": ["quantumcomputing"],
        "tags": [],
        "url": "/quantumcomputing/2024/02/16/annealing_factorization.html",
        "teaser": null
      },{
        "title": "Optimizing quantum circuit using boolean algebra",
        "excerpt":"Since the latest v0.1.18 version, the Qlasskit library offers two useful tool for circuit analysis and optimization. Decompiler: given a quantum circuit is able to detect section that can be represented as boolean expressions circuit_boolean_optimizer: a pipeline that given a quantum circuit, decompose it in boolean expressions form and optimize...","categories": ["quantumcomputing"],
        "tags": [],
        "url": "/quantumcomputing/2024/03/05/optimizing_quantum_circuit.html",
        "teaser": null
      },{
        "title": "Free Cartography on Garmin Etrex 10 (and all Garmin GPSs)",
        "excerpt":"Despite it is sold as a non-cartographic handled GPS device, with limited storage capacity of 10 MB and the inability to expand it, the eTrex 10 GPS, like almost all Garmin devices, is capable of reading Garmin cartography in IMG format. However, the storage limitation prevents to use standard Garmin...","categories": ["gis"],
        "tags": [],
        "url": "/gis/2024/04/20/osm_to_garmin.html",
        "teaser": null
      }]
