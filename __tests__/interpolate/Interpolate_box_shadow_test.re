open Jest;

let it = test;

describe("Interpolate_box_shadow", () => {
  describe("interpolateBoxShadow", () => {
    it("should interpolate a box shadow from one value to another", () => {
      let from = "0px 0px rgba(0, 0, 0, 1)";
      let to_ = "10px 5px rgba(255, 255, 255, 0.4)";

      Expect.(
        expect(
          Interpolate_box_shadow.interpolateBoxShadow(
            ~range=(0., 150.),
            ~domain=(from, to_),
            ~value=75.,
          ),
        )
        |> toEqual("5px 2.5px 0px 0px rgba(127, 127, 127, 0.7)")
      );
    });

    it("should handle box shadows of different shorthand styles", () => {
      let from = "0px 0px 6px 4px #64C88C";
      let to_ = "10px 5px rgba(255, 255, 255, 0.4)";

      Expect.(
        expect(
          Interpolate_box_shadow.interpolateBoxShadow(
            ~range=(0., 150.),
            ~domain=(from, to_),
            ~value=75.,
          ),
        )
        |> toEqual("5px 2.5px 3px 2px rgba(177, 227, 197, 0.7)")
      );
    });

    it("should handle box shadows with an inset property", () => {
      let from = "inset 0px 0px 6px 4px rgba(0, 0, 0, 0)";
      let to_ = "inset 10px 5px 10px rgba(200, 200, 200, 0.4)";

      Expect.(
        expect(
          Interpolate_box_shadow.interpolateBoxShadow(
            ~range=(0., 150.),
            ~domain=(from, to_),
            ~value=75.,
          ),
        )
        |> toEqual("inset 5px 2.5px 8px 2px rgba(100, 100, 100, 0.2)")
      );
    });

    it(
      "should default none box shadows to a 0px 0px 0px 0px rgba(0, 0, 0, 1) for interpolation",
      () => {
        let from = "-10px -20px 6px 4px rgba(100, 100, 100, 0)";
        let to_ = "none";

        Expect.(
          expect(
            Interpolate_box_shadow.interpolateBoxShadow(
              ~range=(0., 150.),
              ~domain=(from, to_),
              ~value=75.,
            ),
          )
          |> toEqual("-5px -10px 3px 2px rgba(50, 50, 50, 0.5)")
        );
      },
    );
  });

  describe("interpolateBoxShadow", () => {
    it("should interpolate multiple box-shadows", () => {
      let from = "0px 0px rgba(0, 0, 0, 1), 10px 5px rgba(200, 200, 200, 0)";
      let to_ = "10px 5px rgba(255, 255, 255, 0.4), 5px 0px 10px 20px rgba(50, 50, 50, 1)";

      Expect.(
        expect(
          Interpolate_box_shadow.interpolateBoxShadows(
            ~range=(0., 150.),
            ~domain=(from, to_),
            ~value=75.,
          ),
        )
        |> toEqual(
             "5px 2.5px 0px 0px rgba(127, 127, 127, 0.7), 7.5px 2.5px 5px 10px rgba(125, 125, 125, 0.5)",
           )
      );
    })
  });
});