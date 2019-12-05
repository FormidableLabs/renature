[@genType]
let g: float;

[@genType]
let force: (~attractorMass: float, ~moverMass: float, ~r: float) => float;

[@genType]
let forceV:
  (
    ~attractorMass: float,
    ~moverMass: float,
    ~attractor: Vector.t(float),
    ~mover: Vector.t(float)
  ) =>
  Vector.t(float);