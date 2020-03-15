[@genType]
let constrainf: (~low: float, ~high: float, float) => float;

[@genType]
let lerpf: (~acc: float, ~target: float, ~roundness: float) => float;

[@genType]
let remapf:
  (~range: (float, float), ~domain: (float, float), ~value: float) => float;

[@genType]
let normalizef: (~range: (float, float), ~value: float) => float;