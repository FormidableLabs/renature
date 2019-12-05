open Jest;

let it = test;

describe("Math", () => {
  describe("sq", () =>
    it("should square an integer", () =>
      Expect.(expect(Math.sq(9)) |> toEqual(81))
    )
  );

  describe("sqf", () =>
    it("should square a float", () =>
      Expect.(expect(Math.sqf(6.6)) |> toBeSoCloseTo(43.56, ~digits=2))
    )
  );

  describe("pow", () => {
    it("should raise base to the exp power", () =>
      Expect.(expect(Math.pow(~base=10, ~exp=5)) |> toEqual(100000.))
    );

    it("should handle negative exponents", () =>
      Expect.(expect(Math.pow(~base=10, ~exp=-5)) |> toBeCloseTo(0.00001))
    );
  });

  describe("lerp", () =>
    it("should linear interpolate between integer values", () =>
      Expect.(
        expect(Math.lerp(~acc=5, ~target=25, ~roundness=0.35))
        |> toEqual(12)
      )
    )
  );

  describe("lerpf", () =>
    it("should linear interpolate between float values", () =>
      Expect.(
        expect(Math.lerpf(~acc=5., ~target=25., ~roundness=0.35))
        |> toEqual(12.)
      )
    )
  );
});