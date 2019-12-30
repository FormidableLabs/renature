let frictionForceV = (~mu, ~normal=1., ~velocity, ()) => {
  // Derive the magnitude of the frictive force.
  let mag = mu *. normal;

  /**
   * Friction acts in the opposite direction of motion.
   * Normalize the velocity vector and multiply by -1
   * to derive the direction of the frictive force.
   */
  let dir = Vector.multf(~v=velocity, ~s=-1.) |> Vector.normf;

  Vector.multf(~v=dir, ~s=mag);
};