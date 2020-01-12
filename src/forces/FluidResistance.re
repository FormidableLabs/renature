let fluidResistanceForceMag = (~rho, ~velocity, ~area, ~cDrag) => {
  let speed = Vector.magf(velocity);

  0.5 *. rho *. speed ** 2. *. area *. cDrag;
};

let fluidResistanceForceV = (~rho, ~velocity, ~area, ~cDrag) => {
  // Derive the magnitude of the drag force.
  let mag = fluidResistanceForceMag(~rho, ~velocity, ~area, ~cDrag);

  /**
   * Fluid resistance acts in the opposite direction of motion.
   * Normalize the velocity vector and multiply by -1
   * to derive the direction of the drag force.
   */
  let dir = Vector.multf(~v=velocity, ~s=-1.) |> Vector.normf;

  Vector.multf(~v=dir, ~s=mag);
};

/**
 * The terminal velocity of an object of mass, m, with frontal area A,
 * and a coefficient of drag C, moving through a fluid with density, ρ.
 */
let getTerminalVelocity = (~mass, ~rho, ~cDrag, ~area) =>
  sqrt(2. *. mass *. Gravity.gE /. (rho *. area *. cDrag));

// The time scale, tau, along which terminal velocity is approached.
let getTau = (~mass, ~rho, ~cDrag, ~area) =>
  sqrt(2. *. mass /. (Gravity.gE *. rho *. area *. cDrag));

/**
 * Position at a function of time for an object of mass, m, with frontal
 * area A, and a coefficient of drag C, moving through a fluid with density, ρ.
 */
let getFluidPositionAtTime = (~time, ~mass, ~rho, ~cDrag, ~area) => {
  let tv = getTerminalVelocity(~mass, ~rho, ~cDrag, ~area);
  tv ** 2. /. Gravity.gE *. log1p(cosh(Gravity.gE *. time) /. tv);
};

/**
 * The position of an object of mass, m, with frontal area A,
 * and a coefficient of drag C, moving through a fluid with density, ρ.
 * when it has achieved 99% of terminal velocity.
 */
let getFluidPositionAtTerminalVelocity = (~mass, ~rho, ~cDrag, ~area) => {
  let tau = getTau(~mass, ~rho, ~cDrag, ~area);
  getFluidPositionAtTime(~time=3. *. tau, ~mass, ~rho, ~cDrag, ~area);
};