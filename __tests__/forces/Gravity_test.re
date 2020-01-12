open Jest;

let it = test;

describe("Gravity", () => {
  describe("force", () => {
    it("should derive the force of gravity between two objects", () =>
      Expect.(
        expect(
          Gravity.gravityForceMag(~attractorMass=1., ~moverMass=1., ~r=1.),
        )
        |> toBeCloseTo(Gravity.gU)
      )
    );

    it(
      "should correctly derive the force of gravity at the Earth's surface", () => {
      let massEarth = 5.97 *. 10. ** 24.;
      let massObject = 25.;
      let rEarth = 6.371 *. 10. ** 6.;

      Expect.(
        expect(
          Gravity.gravityForceMag(
            ~attractorMass=massEarth,
            ~moverMass=massObject,
            ~r=rEarth,
          )
          |> Printf.printf("%0.*f\n", 2),
        )
        |> toEqual(0.098 *. massObject |> Printf.printf("%0.*f\n", 2))
      );
    });
  });

  describe("gravityForceV", () => {
    let attractorMass = 25.;
    let moverMass = 50.;
    let attractor = (5., 10.);
    let mover = (20., 50.);

    it(
      "should correctly derive the vector of the force of gravity in two dimensions",
      () =>
      Expect.(
        expect(
          Gravity.gravityForceV(
            ~attractorMass,
            ~moverMass,
            ~attractor,
            ~mover,
            (),
          )
          |> fst,
        )
        |> toBeCloseTo(-0.00002680847)
      )
    );

    it(
      "should correctly derive the vector of the force of gravity in two dimensions",
      () =>
      Expect.(
        expect(
          Gravity.gravityForceV(
            ~attractorMass,
            ~moverMass,
            ~attractor,
            ~mover,
            (),
          )
          |> snd,
        )
        |> toBeCloseTo(-0.0000714892571)
      )
    );
  });
});