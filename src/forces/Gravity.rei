[@genType]
let g: float;

[@genType]
let force: (~attractorMass: float, ~moverMass: float, ~r: float) => float;

[@genType]
let gravityForceV:
  (
    ~attractorMass: float,
    ~moverMass: float,
    ~attractor: Vector.t(float),
    ~mover: Vector.t(float),
    ~threshold: (float, float)=?,
    unit
  ) =>
  Vector.t(float);