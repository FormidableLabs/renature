open Jest;

let it = test;

describe("Interpolate_unit", () =>
  describe("remapUnit", () => {
    it("should interpolate from one unit value to another", () => {
      let from = "45px";
      let to_ = "100px";

      Expect.(
        expect(
          Interpolate_unit.remapUnit(
            ~range=(0., 150.),
            ~domain=(from, to_),
            ~value=75.,
          ),
        )
        |> toEqual("72.5px")
      );
    });

    it("should handle percentage units", () => {
      let from = "45%";
      let to_ = "100%";

      Expect.(
        expect(
          Interpolate_unit.remapUnit(
            ~range=(0., 150.),
            ~domain=(from, to_),
            ~value=75.,
          ),
        )
        |> toEqual("72.5%")
      );
    });

    it("should handle rem units", () => {
      let from = "45rem";
      let to_ = "100rem";

      Expect.(
        expect(
          Interpolate_unit.remapUnit(
            ~range=(0., 150.),
            ~domain=(from, to_),
            ~value=75.,
          ),
        )
        |> toEqual("72.5rem")
      );
    });

    it(
      "should just return the number portion of the unit if the unit does not match a known CSS unit",
      () => {
        let from = "45chonks";
        let to_ = "100chonks";

        Expect.(
          expect(
            Interpolate_unit.remapUnit(
              ~range=(0., 150.),
              ~domain=(from, to_),
              ~value=75.,
            ),
          )
          |> toEqual("72.5")
        );
      },
    );
  })
);