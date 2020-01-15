[@genType]
type vector('a) = ('a, 'a);
[@genType]
type t('a) = vector('a);

[@genType]
let add: (~v1: vector(int), ~v2: vector(int)) => vector(int);
[@genType]
let addf: (~v1: vector(float), ~v2: vector(float)) => vector(float);

[@genType]
let sub: (~v1: vector(int), ~v2: vector(int)) => vector(int);
[@genType]
let subf: (~v1: vector(float), ~v2: vector(float)) => vector(float);

[@genType]
let mult: (~v: vector(int), ~s: int) => vector(int);
[@genType]
let multf: (~v: vector(float), ~s: float) => vector(float);

[@genType]
let div: (~v: vector(int), ~s: int) => vector(int);
[@genType]
let divf: (~v: vector(float), ~s: float) => vector(float);

[@genType]
let mag: vector(int) => float;
[@genType]
let magf: vector(float) => float;

[@genType]
let norm: vector(int) => vector(float);
[@genType]
let normf: vector(float) => vector(float);

[@genType]
let lerpV:
  (~acc: vector(int), ~target: vector(int), ~roundness: float) =>
  vector(int);
[@genType]
let lerpfV:
  (~acc: vector(float), ~target: vector(float), ~roundness: float) =>
  vector(float);