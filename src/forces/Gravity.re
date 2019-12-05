let g = 6.67428 *. Math.pow(~base=10, ~exp=-11);
let force = (~m1, ~m2, ~r) => g *. m1 *. m2 /. Math.sqf(r);

let forceV = (~m1, ~m2, ~v1, ~v2) => {
  // Derive the vector pointing from m1 to m2.
  let v = Vector.subf(~v1, ~v2);

  // Derive the magnitude of the above vector.
  let mag = Vector.magf(v);

  // Derive the unit vector of the above vector.
  let dir = Vector.normf(v);

  // Multiply the unit vector by the size of the force.
  Vector.multf(~v=dir, ~s=force(~m1, ~m2, ~r=mag));
};