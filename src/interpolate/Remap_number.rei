[@genType]
let remapf:
  (~range: (float, float), ~domain: (float, float), ~value: float) => float;
[@genType]
let remap: (~range: (int, int), ~domain: (int, int), ~value: int) => int;

[@genType]
let normalizef: (~range: (float, float), ~value: float) => float;
[@genType]
let normalize: (~range: (int, int), ~value: int) => int;