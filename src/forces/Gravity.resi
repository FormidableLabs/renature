export gU: float

export gE: float

export gravityForceMag: (
  ~attractorMass: float,
  ~moverMass: float,
  ~r: float,
  ~g: float=?,
  unit,
) => float

export gravityForceV: (
  ~attractorMass: float,
  ~moverMass: float,
  ~attractor: Vector.t<float>,
  ~mover: Vector.t<float>,
  ~g: float=?,
  ~threshold: (float, float)=?,
  unit,
) => Vector.t<float>
