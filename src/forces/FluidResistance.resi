let fluidResistanceForceMag: (
  ~rho: float,
  ~velocity: Vector.vector<float>,
  ~area: float,
  ~cDrag: float,
) => float

export fluidResistanceForceV: (
  ~rho: float,
  ~velocity: Vector.vector<float>,
  ~area: float,
  ~cDrag: float,
) => Vector.t<float>

export getTau: (~mass: float, ~rho: float, ~cDrag: float, ~area: float) => float

export getFluidPositionAtTime: (
  ~time: float,
  ~mass: float,
  ~rho: float,
  ~cDrag: float,
  ~area: float,
) => float

export getFluidPositionAtTerminalVelocity: (
  ~mass: float,
  ~rho: float,
  ~cDrag: float,
  ~area: float,
) => float
