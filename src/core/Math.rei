[@genType]
let sq: int => int;
[@genType]
let sqf: float => float;

[@genType]
let pow: (~base: int, ~exp: int) => float;

[@genType]
let lerp: (~acc: int, ~target: int, ~roundness: float) => int;
[@genType]
let lerpf: (~acc: float, ~target: float, ~roundness: float) => float;

[@genType]
let remap:
  (~value: int, ~low1: int, ~high1: int, ~low2: int, ~high2: int) => int;
[@genType]
let remapf:
  (~value: float, ~low1: float, ~high1: float, ~low2: float, ~high2: float) =>
  float;

[@genType]
let norm: (~value: float, ~low: float, ~high: float) => float;

[@genType]
let constrain: (~low: 'a, ~high: 'a, 'a) => 'a;