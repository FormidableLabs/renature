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