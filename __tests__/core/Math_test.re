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
});