open Jest;

let it = test;

describe("Interpolate_number", () => {
  describe("lerpf", () =>
    it("should linear interpolate between float values", () =>
      Expect.(
        expect(
          Interpolate_number.lerpf(~acc=5., ~target=25., ~roundness=0.35),
        )
        |> toEqual(12.)
      )
    )
  );

  describe("remapf", () => {
    it(
      "should map a value on an input range to a value on an output domain", () =>
      Expect.(
        expect(
          Interpolate_number.remapf(
            ~range=(0., 300.),
            ~domain=(0., 1.),
            ~value=150.,
          ),
        )
        |> toEqual(0.5)
      )
    );

    it("should handle ranges and domains with non-overlapping inputs", () =>
      Expect.(
        expect(
          Interpolate_number.remapf(
            ~range=(200., 300.),
            ~domain=(10., 15.),
            ~value=220.,
          ),
        )
        |> toEqual(11.)
      )
    );

    it("should extrapolate outside the input range", () =>
      Expect.(
        expect(
          Interpolate_number.remapf(
            ~range=(200., 300.),
            ~domain=(10., 15.),
            ~value=180.,
          ),
        )
        |> toEqual(9.)
      )
    );

    it("should handle a negative input range", () =>
      Expect.(
        expect(
          Interpolate_number.remapf(
            ~range=((-200.), (-300.)),
            ~domain=(10., 15.),
            ~value=-220.,
          ),
        )
        |> toEqual(11.)
      )
    );
  });

  describe("normalizef", () => {
    it(
      "should map a number on an input range to a value in the domain [0, 1]",
      () =>
      Expect.(
        expect(
          Interpolate_number.normalizef(~range=(0., 300.), ~value=150.),
        )
        |> toEqual(0.5)
      )
    );

    it("should extrapolate outside the input range", () =>
      Expect.(
        expect(
          Interpolate_number.normalizef(~range=(200., 300.), ~value=150.),
        )
        |> toEqual(-0.5)
      )
    );

    it("should handle a negative input range", () =>
      Expect.(
        expect(
          Interpolate_number.normalizef(
            ~range=((-200.), (-300.)),
            ~value=-250.,
          ),
        )
        |> toEqual(0.5)
      )
    );
  });
});