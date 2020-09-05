// The magnitude of the friction force.
let frictionForceMag = (~mu, ~mass) => mu *. Gravity.gE *. mass

// The frictional force vector.
let frictionForceV = (~mu, ~mass, ~velocity) => {
  // Derive the magnitude of the frictive force.
  let mag = frictionForceMag(~mu, ~mass)

  @ocaml.doc(
    "
   * Friction acts in the opposite direction of motion.
   * Normalize the velocity vector and multiply by -1
   * to derive the direction of the frictive force.
   "
  )
  let dir = Vector.multf(~v=velocity, ~s=-1.) |> Vector.normf

  Vector.multf(~v=dir, ~s=mag)
}

@ocaml.doc(
  "
 * The kinematic equation for deriving distance traveled
 * by a body to reach rest assuming constant acceleration.
 "
)
let getMaxDistanceFriction = (~mu, ~initialVelocity) => {
  let accelerationF = -1. *. mu *. Gravity.gE

  initialVelocity ** 2. /. (-2. *. accelerationF)
}
