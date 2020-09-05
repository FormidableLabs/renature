type entity = {
  mass: float,
  acceleration: Vector.t<float>,
  velocity: Vector.t<float>,
  position: Vector.t<float>,
}

let applyForce = (~force, ~entity, ~time) => {
  // Derive the acceleration created by the force and add it to the current acceleration.
  let nextAcceleration = Vector.divf(~v=force, ~s=entity.mass)

  // Add the acceleration to the current velocity.
  let nextVelocity = Vector.addf(
    ~v1=entity.velocity,
    ~v2=Vector.multf(~v=nextAcceleration, ~s=time),
  )

  // Add the velocity to the position.
  let nextPosition = Vector.addf(~v1=entity.position, ~v2=Vector.multf(~v=nextVelocity, ~s=time))

  {
    mass: entity.mass,
    acceleration: nextAcceleration,
    velocity: nextVelocity,
    position: nextPosition,
  }
}
