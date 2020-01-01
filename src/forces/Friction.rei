[@genType]
let frictionForceMag: (~mu: float, ~mass: float) => float;

[@genType]
let frictionForceV:
  (~mu: float, ~mass: float, ~velocity: Vector.t(float)) => Vector.t(float);

[@genType]
let getMaxDistanceFriction: (~mu: float, ~initialVelocity: float) => float;