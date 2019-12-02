type vector('a) = ('a, 'a);

let add: (~v1: vector(int), ~v2: vector(int)) => vector(int);
let addf: (~v1: vector(float), ~v2: vector(float)) => vector(float);

let sub: (~v1: vector(int), ~v2: vector(int)) => vector(int);
let subf: (~v1: vector(float), ~v2: vector(float)) => vector(float);

let mult: (~v: vector(int), ~s: int) => vector(int);
let multf: (~v: vector(float), ~s: float) => vector(float);

let div: (~v: vector(int), ~s: int) => vector(int);
let divf: (~v: vector(float), ~s: float) => vector(float);

let mag: vector(int) => float;
let magf: vector(float) => float;

let norm: vector(int) => vector(float);
let normf: vector(float) => vector(float);

let lerp:
  (~acc: vector(float), ~target: vector(float), ~roundness: float) =>
  vector(int);
let lerpf:
  (~acc: vector(float), ~target: vector(float), ~roundness: float) =>
  vector(float);