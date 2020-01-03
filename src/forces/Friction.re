// The magnitude of the friction force.
let frictionForceMag = (~mu, ~mass) => {
  mu *. Gravity.gE *. mass;
};

// The frictional force vector.
let frictionForceV = (~mu, ~mass, ~velocity) => {
  // let velocity = Vector.multf(~v=velocity, ~s=1000.);

  // Derive the magnitude of the frictive force.
  let mag = frictionForceMag(~mu, ~mass);

  /**
   * Friction acts in the opposite direction of motion.
   * Normalize the velocity vector and multiply by -1
   * to derive the direction of the frictive force.
   */
  let dir = Vector.multf(~v=velocity, ~s=-1.) |> Vector.normf;

  Vector.multf(~v=dir, ~s=mag);
};

/**
 * The kinematic equation for deriving distance traveled
 * by a body to reach rest assuming constant acceleration.
 */
let getMaxDistanceFriction = (~mu, ~initialVelocity) => {
  let accelerationF = (-1.) *. mu *. Gravity.gE;

  // Initial velocity is provided in m / ms. Multiply by 1000 to derive m / s.
  Math.sqf(initialVelocity *. 1000.) /. ((-2.) *. accelerationF);
};