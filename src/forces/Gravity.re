let g = 6.67428 *. Math.pow(~base=10, ~exp=-11);
let force = (~attractorMass, ~moverMass, ~r) =>
  g *. attractorMass *. moverMass /. Math.sqf(r);

let forceV =
    (~attractorMass, ~moverMass, ~attractor, ~mover, ~threshold=?, ()) => {
  // Derive the vector pointing from attractor to mover.
  let v = Vector.subf(~v1=attractor, ~v2=mover);

  // Derive the magnitude of the above vector.
  let mag = Vector.magf(v);

  // Constrain the gravitational force if threshold constraints were supplied.
  let distance =
    switch (threshold) {
    | Some(th) => Math.constrain(~low=fst(th), ~high=snd(th), mag)
    | None => mag
    };

  // Derive the unit vector of the above vector.
  let dir = Vector.normf(v);

  // Multiply the unit vector by the size of the force.
  Vector.multf(~v=dir, ~s=force(~attractorMass, ~moverMass, ~r=distance));
};