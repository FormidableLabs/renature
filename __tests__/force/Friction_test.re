open Jest;

let it = test;

describe("Friction", () =>
  describe("frictionForceV", () => {
    let mu = 0.01;
    let normal = 15.;
    let velocity = (0.05, 0.1);

    it(
      "should correctly derive the vector of the force of friction in two dimensions",
      () =>
      Expect.(
        expect(Friction.frictionForceV(~mu, ~normal, ~velocity, ()) |> fst)
        |> toBeCloseTo(-0.06708)
      )
    );

    it(
      "should correctly derive the vector of the force of friction in two dimensions",
      () =>
      Expect.(
        expect(Friction.frictionForceV(~mu, ~normal, ~velocity, ()) |> snd)
        |> toBeCloseTo(-0.13416)
      )
    );
  })
);