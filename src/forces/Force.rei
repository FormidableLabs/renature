[@genType "Entity"]
type entity = {
  acceleration: Vector.t(float),
  velocity: Vector.t(float),
  position: Vector.t(float),
};

[@genType]
let applyForce:
  (
    ~force: Vector.t(float),
    ~moverMass: float,
    ~acceleration: Vector.t(float),
    ~velocity: Vector.t(float),
    ~position: Vector.t(float)
  ) =>
  entity;