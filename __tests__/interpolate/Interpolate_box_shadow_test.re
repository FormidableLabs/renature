open Jest;

let it = test;

describe("Interpolate_box_shadow", () => {
  describe("testBoxShadow", () => {
    testAll(
      "should test a raw string to verify that it's a valid box-shadow",
      [
        "10px 10px",
        "10px 10px 10px",
        "10px 10px 10px 10px",
        "10px 10px #566566",
        "10px 10px 10px #566566",
        "10px 10px 10px 10px #566566",
        "inset 10px 10px",
        "inset 10px 10px 10px",
        "inset 10px 10px 10px 10px",
        "inset 10px 10px #566566",
        "inset 10px 10px 10px #566566",
        "inset 10px 10px 10px 10px #566566",
        "10px 10px inset red",
        "none",
      ],
      boxShadow => {
      Expect.(
        expect(Interpolate_box_shadow.testBoxShadow(boxShadow))
        |> toBe(true)
      )
    });

    testAll(
      "should flag strings that are not valid box shadows",
      ["10px", "inset 10px", "heck", "10px 10px 10px 10px 10px"],
      boxShadow => {
      Expect.(
        expect(Interpolate_box_shadow.testBoxShadow(boxShadow))
        |> toBe(false)
      )
    });
  });

  describe("parseBoxShadow", () => {
    it(
      "should parse a box-shadow into its discrete parts (offset-x, offset-y)",
      () => {
      Expect.(
        expect(Interpolate_box_shadow.parseBoxShadow("10px 5px red"))
        |> toEqual(
             Interpolate_box_shadow.{
               offsetX: "10px",
               offsetY: "5px",
               blur: "0",
               spread: "0",
               color: "red",
               inset: false,
             },
           )
      )
    });

    it(
      "should parse a box-shadow into its discrete parts (offset-x, offset-y, blur-radius)",
      () => {
      Expect.(
        expect(
          Interpolate_box_shadow.parseBoxShadow("10px 5px 1rem #256542"),
        )
        |> toEqual(
             Interpolate_box_shadow.{
               offsetX: "10px",
               offsetY: "5px",
               blur: "1rem",
               spread: "0",
               color: "#256542",
               inset: false,
             },
           )
      )
    });

    it(
      "should parse a box-shadow into its discrete parts (offset-x, offset-y, blur-radius, spread-radius)",
      () => {
      Expect.(
        expect(
          Interpolate_box_shadow.parseBoxShadow(
            "10px 5px 1rem 0.5em rgba(255, 255, 255, 1)",
          ),
        )
        |> toEqual(
             Interpolate_box_shadow.{
               offsetX: "10px",
               offsetY: "5px",
               blur: "1rem",
               spread: "0.5em",
               color: "rgba(255, 255, 255, 1)",
               inset: false,
             },
           )
      )
    });

    it(
      "should parse a box-shadow into its discrete parts (offset-x, offset-y, blur-radius, spread-radius, inset)",
      () => {
      Expect.(
        expect(
          Interpolate_box_shadow.parseBoxShadow(
            "inset 10px 5px 1rem 0.5em teal",
          ),
        )
        |> toEqual(
             Interpolate_box_shadow.{
               offsetX: "10px",
               offsetY: "5px",
               blur: "1rem",
               spread: "0.5em",
               color: "teal",
               inset: true,
             },
           )
      )
    });
  });

  describe("remapBoxShadow", () => {
    it("should interpolate a box shadow from one value to another", () => {
      let from = "0px 0px rgba(0, 0, 0, 1)";
      let to_ = "10px 5px rgba(255, 255, 255, 0.4)";

      Expect.(
        expect(
          Interpolate_box_shadow.remapBoxShadow(
            ~range=(0., 150.),
            ~domain=(from, to_),
            ~value=75.,
          ),
        )
        |> toEqual("5px 2.5px 0 0 rgba(127, 127, 127, 0.7)")
      );
    });

    it("should handle box shadows of different shorthand styles", () => {
      let from = "0px 0px 6px 4px #64C88C";
      let to_ = "10px 5px rgba(255, 255, 255, 0.4)";

      Expect.(
        expect(
          Interpolate_box_shadow.remapBoxShadow(
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
          Interpolate_box_shadow.remapBoxShadow(
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
            Interpolate_box_shadow.remapBoxShadow(
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
});