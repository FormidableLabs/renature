// The Universal Gravitational Constant, G.
let gU = 6.67428 *. 10. ** (-11.);

// The acceleration due to gravity at Earth's surface.
let gE = 9.80665;

// The magnitude of the gravitational force.
let gravityForceMag = (~attractorMass, ~moverMass, ~r, ~g=gU, ()) =>
  g *. attractorMass *. moverMass /. r ** 2.;

// The gravitational force vector.
let gravityForceV =
    (~attractorMass, ~moverMass, ~attractor, ~mover, ~g=gU, ~threshold=?, ()) => {
  // Derive the vector pointing from attractor to mover.
  let v = Vector.subf(~v1=attractor, ~v2=mover);

  // Derive the magnitude of the above vector.
  let mag = Vector.magf(v);

  // Constrain the gravitational force if threshold constraints were supplied.
  let distance =
    switch (threshold) {
    | Some(th) => Math.constrainf(~low=fst(th), ~high=snd(th), mag)
    | None => mag
    };

  // Derive the unit vector of the above vector.
  let dir = Vector.normf(v);

  // Multiply the unit vector by the size of the force.
  Vector.multf(
    ~v=dir,
    ~s=gravityForceMag(~attractorMass, ~moverMass, ~r=distance, ~g, ()),
  );
};