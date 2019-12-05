open Jest;

let it = test;

describe("Gravity", () => {
  describe("force", () => {
    it("should derive the force of gravity between two objects", () =>
      Expect.(
        expect(Gravity.force(~m1=1., ~m2=1., ~r=1.))
        |> toBeCloseTo(Gravity.g)
      )
    );

    it(
      "should correctly derive the force of gravity at the Earth's surface", () => {
      let massEarth = 5.97 *. Math.pow(~base=10, ~exp=24);
      let massObject = 25.;
      let rEarth = 6.371 *. Math.pow(~base=10, ~exp=6);
      Expect.(
        expect(
          Gravity.force(~m1=massEarth, ~m2=massObject, ~r=rEarth)
          |> Printf.printf("%0.*f\n", 2),
        )
        |> toEqual(0.098 *. massObject |> Printf.printf("%0.*f\n", 2))
      );
    });
  });

  describe("forceV", () => {
    let m1 = 25.;
    let m2 = 50.;
    let v1 = (5., 10.);
    let v2 = (20., 50.);

    it(
      "should correctly derive the vector of the force of gravity in two dimensions",
      () =>
      Expect.(
        expect(Gravity.forceV(~m1, ~m2, ~v1, ~v2) |> fst)
        |> toBeCloseTo(-0.00002680847)
      )
    );

    it(
      "should correctly derive the vector of the force of gravity in two dimensions",
      () =>
      Expect.(
        expect(Gravity.forceV(~m1, ~m2, ~v1, ~v2) |> snd)
        |> toBeCloseTo(-0.0000714892571)
      )
    );
  });
});