type entity = {
  acceleration: Vector.t(float),
  velocity: Vector.t(float),
  position: Vector.t(float),
};

let applyForce = (~force, ~moverMass, ~acceleration, ~velocity, ~position) => {
  // Derive the acceleration created by the force and add it to the current acceleration.
  let nextAcceleration =
    Vector.addf(~v1=acceleration, ~v2=Vector.divf(~v=force, ~s=moverMass));

  // Add the acceleration to the current velocity.
  let nextVelocity = Vector.addf(~v1=velocity, ~v2=nextAcceleration);

  // Add the velocity to the position.
  let nextPosition = Vector.addf(~v1=position, ~v2=nextVelocity);

  {
    acceleration: nextAcceleration,
    velocity: nextVelocity,
    position: nextPosition,
  };
};