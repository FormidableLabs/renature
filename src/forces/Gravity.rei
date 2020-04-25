[@genType]
let gU: float;

[@genType]
let gE: float;

[@genType]
let gravityForceMag:
  (~attractorMass: float, ~moverMass: float, ~r: float, ~g: float=?, unit) =>
  float;

[@genType]
let gravityForceV:
  (
    ~attractorMass: float,
    ~moverMass: float,
    ~attractor: Vector.t(float),
    ~mover: Vector.t(float),
    ~g: float=?,
    ~threshold: (float, float)=?,
    unit
  ) =>
  Vector.t(float);