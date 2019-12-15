[@genType]
let lerp: (~acc: int, ~target: int, ~roundness: float) => int;
[@genType]
let lerpf: (~acc: float, ~target: float, ~roundness: float) => float;

[@genType]
let remapf:
  (~range: (float, float), ~domain: (float, float), ~value: float) => float;
[@genType]
let remap: (~range: (int, int), ~domain: (int, int), ~value: int) => int;

[@genType]
let normalizef: (~range: (float, float), ~value: float) => float;
[@genType]
let normalize: (~range: (int, int), ~value: int) => int;