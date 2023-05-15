---
layout: posts
title:  "King of Tezos: a smart-ponzi on Tezos"
date:   2020-06-24 15:59:28 +0200
categories: tezos
canonical_url: https://medium.com/@dakk/king-of-tezos-a-smart-ponzi-on-tezos-db381b84c3c9?source=rss-cabef10421d0------2
---

While writing a new programming language, it is often useful to write some real use-cases to test the syntax, the language expressiveness and the code cleanness comparing to other languages.

So I did for [yallo-lang](https://github.com/dakk/yallo-lang), a (still experimental) smart contract language for Tezos; for starting I chose a contract already existing on ethereum, [king_of_ether](https://www.kingoftheether.com) (that's right guys, a smart-ponzi). 

Our minimal implementation is very simple: a single endpoint which allow the caller to become the king if he sends the contract balance * 2; the old king is then dismissed, but he receives in exchange twice the amount he sent to become a king. And so on.

We start with the yallo contract:

```
contract KingOfTezos {
	field theKing: address;
	field currentPrice: mutez;

	entry beTheKing() {
		assert (Tezos.amount() >= this.currentPrice);
		let op = Tezos.transfer (this.theKing, this.currentPrice);
		this.theKing = Tezos.sender();
		this.currentPrice = Tezos.amount() * 2n;
		[ op ]
	}
}
```

We transpile it to ligo:
`yallo.exe compile king_of_tezos.yallo -target ligo`

At that is the result:
```
type storage = {  theKing: address;  currentPrice: tez;  }

type action = | BeTheKing of unit

let beTheKing (s: storage) = 
  let ovverraidable = if ((Tezos.amount) >= (s.currentPrice)) then () else failwith "Assertion" in
  let op: operation = Tezos.transaction (unit) (s.currentPrice) (match (Tezos.get_contract_opt s.theKing : unit contract option) with| None -> (failwith "invalid contract": unit contract) | Some(c) -> c) in
  let s = { s with theKing=Tezos.sender } in
  let s = { s with currentPrice=(Tezos.amount) * (2n) } in
  (([op]: operation list), (s: storage))


let main(a, s: action * storage): (operation list * storage) = 
  match a with | BeTheKing (arg) -> beTheKing(s)
```

Then ligo compiler does the rest, and we got king.tz:
```
{ parameter unit ;
  storage (pair (mutez %currentPrice) (address %theKing)) ;
  code { DUP ;
         CDR ;
         DUP ;
         CAR ;
         AMOUNT ;
         COMPARE ;
         GE ;
         IF { PUSH unit Unit } { PUSH string "Assertion" ; FAILWITH } ;
         DIG 1 ;
         DUP ;
         DUG 2 ;
         CDR ;
         CONTRACT unit ;
         IF_NONE
           { PUSH string "invalid contract" ; FAILWITH }
           { DUP ; DIP { DROP } } ;
         DIG 2 ;
         DUP ;
         DUG 3 ;
         CAR ;
         UNIT ;
         TRANSFER_TOKENS ;
         DIG 2 ;
         DUP ;
         DUG 3 ;
         CAR ;
         SENDER ;
         SWAP ;
         PAIR ;
         DUP ;
         PUSH nat 2 ;
         AMOUNT ;
         MUL ;
         SWAP ;
         CDR ;
         SWAP ;
         PAIR ;
         DUP ;
         NIL operation ;
         DIG 4 ;
         DUP ;
         DUG 5 ;
         CONS ;
         PAIR ;
         DIP { DROP 6 } } }
```

We then try it on carthagenet:

1. Deploy
```
	tezos-client originate contract kot transferring 1 from my_account running king.tz --init "(Pair 2000000 \"tz1VnNQMNQ796WrY2TyWDaFpwsRTP41mKXWH\")" --force --burn-cap 0.555
```

2. We try to become the king with an invalid amount
```
	tezos-client transfer 1 from my_account2 to kot --arg "Unit" --burn-cap 0.004
```

	Obviusly the simulation fails with: *script reached FAILWITH instruction*

3. We try to become the king with a valid amount
```
	tezos-client transfer 2 from my_account to kot --arg "Unit" --burn-cap 0.004
```

	And now we are the king of tezos. We can send further transactions doubling the amount every time.

You can inspect the contract and few beTheKing call transactions on [bettercalldev](https://better-call.dev/carthagenet/KT1NLkwCzuUwhUe9N2iqpt8yNrT3D4hXAVYp/operations).

![Operation list](/assets/2020-06-24-king_of_tezos.png)
