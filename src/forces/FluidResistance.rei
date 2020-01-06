let fluidResistanceForceMag:
  (
    ~rho: float,
    ~velocity: Vector.vector(float),
    ~area: float,
    ~cDrag: float
  ) =>
  float;

[@genType]
let fluidResistanceForceV:
  (
    ~rho: float,
    ~velocity: Vector.vector(float),
    ~area: float,
    ~cDrag: float
  ) =>
  Vector.t(float);

[@genType]
let getTau: (~mass: float, ~rho: float, ~cDrag: float, ~area: float) => float;

[@genType]
let getFluidPositionAtTime:
  (~time: float, ~mass: float, ~rho: float, ~cDrag: float, ~area: float) =>
  float;

[@genType]
let getFluidPositionAtTerminalVelocity:
  (~mass: float, ~rho: float, ~cDrag: float, ~area: float) => float;