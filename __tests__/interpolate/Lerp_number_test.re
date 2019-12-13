open Jest;

let it = test;

describe("Lerp_number", () => {
  describe("lerp", () =>
    it("should linear interpolate between integer values", () =>
      Expect.(
        expect(Lerp_number.lerp(~acc=5, ~target=25, ~roundness=0.35))
        |> toEqual(12)
      )
    )
  );

  describe("lerpf", () =>
    it("should linear interpolate between float values", () =>
      Expect.(
        expect(Lerp_number.lerpf(~acc=5., ~target=25., ~roundness=0.35))
        |> toEqual(12.)
      )
    )
  );
});