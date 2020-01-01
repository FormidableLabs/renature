open Jest;

let it = test;

describe("Friction", () => {
  describe("frictionForceMag", () =>
    it("should derive the magnitude of the frictional force", () =>
      Expect.(
        expect(Friction.frictionForceMag(~mu=0.01, ~mass=1.))
        |> toEqual(0.01 *. Gravity.gE)
      )
    )
  );

  describe("frictionForceV", () => {
    let mu = 0.01;
    let mass = 15.;
    let velocity = (0.05, 0.1);

    it(
      "should correctly derive the vector of the force of friction in two dimensions",
      () =>
      Expect.(
        expect(Friction.frictionForceV(~mu, ~mass, ~velocity) |> fst)
        |> toBeCloseTo(-0.65785)
      )
    );

    it(
      "should correctly derive the vector of the force of friction in two dimensions",
      () =>
      Expect.(
        expect(Friction.frictionForceV(~mu, ~mass, ~velocity) |> snd)
        |> toBeCloseTo(-1.31568)
      )
    );
  });

  describe("getMaxDistanceFriction", () =>
    it(
      "should derive the max distance an object can travel before coming to rest based on an initial velocity and a constant acceleration",
      () =>
      Expect.(
        expect(
          Friction.getMaxDistanceFriction(~mu=0.1, ~initialVelocity=50.),
        )
        |> toBeCloseTo(1274.65)
      )
    )
  );
});