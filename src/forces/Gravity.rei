[@genType]
let g: float;

[@genType]
let force: (~m1: float, ~m2: float, ~r: float) => float;

[@genType]
let forceV:
  (~m1: float, ~m2: float, ~v1: Vector.t(float), ~v2: Vector.t(float)) =>
  Vector.t(float);