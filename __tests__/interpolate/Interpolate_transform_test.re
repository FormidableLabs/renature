open Jest;

let it = test;

describe("Interpolate_transform", () => {
  describe("parseTransform", () => {
    it("should parse a transform into its transform property and value", () =>
      Expect.(
        expect(Interpolate_transform.parseTransform("translateX(20px)"))
        |> toEqual(
             Interpolate_transform.{
               transformProperty: Js.Nullable.return("translateX"),
               transform: "20px",
             },
           )
      )
    );

    it(
      "should handle translate, scale, rotate, skew, and perspective in one dimensions",
      () => {
        let translate =
          Interpolate_transform.parseTransform("translateY(20px)");
        let scale = Interpolate_transform.parseTransform("scaleZ(0.5)");
        let rotate = Interpolate_transform.parseTransform("rotateX(0.5turn)");
        let skew = Interpolate_transform.parseTransform("skewZ(1.5rad)");
        let perspective =
          Interpolate_transform.parseTransform("perspective(10px)");

        Expect.(
          expect((translate, scale, rotate, skew, perspective))
          |> toEqual((
               Interpolate_transform.{
                 transformProperty: Js.Nullable.return("translateY"),
                 transform: "20px",
               },
               Interpolate_transform.{
                 transformProperty: Js.Nullable.return("scaleZ"),
                 transform: "0.5",
               },
               Interpolate_transform.{
                 transformProperty: Js.Nullable.return("rotateX"),
                 transform: "0.5turn",
               },
               Interpolate_transform.{
                 transformProperty: Js.Nullable.return("skewZ"),
                 transform: "1.5rad",
               },
               Interpolate_transform.{
                 transformProperty: Js.Nullable.return("perspective"),
                 transform: "10px",
               },
             ))
        );
      },
    );

    it(
      "should just return the unit portion for an unknown translate property",
      () =>
      Expect.(
        expect(Interpolate_transform.parseTransform("spin(20px)"))
        |> toEqual(
             Interpolate_transform.{
               transformProperty: Js.Nullable.null,
               transform: "20px",
             },
           )
      )
    );
  });

  describe("remapTransform", () => {
    it("should interpolate a translate in one dimension", () => {
      let from = "translateX(45px)";
      let to_ = "translateX(100px)";

      Expect.(
        expect(
          Interpolate_transform.remapTransform(
            ~range=(0., 150.),
            ~domain=(from, to_),
            ~value=75.,
          ),
        )
        |> toEqual("translateX(72.5px)")
      );
    });

    it("should interpolate a scale in one dimension property", () => {
      let from = "scaleY(1)";
      let to_ = "scaleY(1.2)";

      Expect.(
        expect(
          Interpolate_transform.remapTransform(
            ~range=(0., 150.),
            ~domain=(from, to_),
            ~value=75.,
          ),
        )
        |> toEqual("scaleY(1.1)")
      );
    });

    it("should interpolate a rotate in one dimension property", () => {
      let from = "rotate(10rad)";
      let to_ = "rotate(6rad)";

      Expect.(
        expect(
          Interpolate_transform.remapTransform(
            ~range=(0., 150.),
            ~domain=(from, to_),
            ~value=75.,
          ),
        )
        |> toEqual("rotate(8rad)")
      );
    });

    it("should interpolate a skew in one dimension property", () => {
      let from = "skewZ(5deg)";
      let to_ = "skewZ(60deg)";

      Expect.(
        expect(
          Interpolate_transform.remapTransform(
            ~range=(0., 150.),
            ~domain=(from, to_),
            ~value=75.,
          ),
        )
        |> toEqual("skewZ(32.5deg)")
      );
    });

    it("should interpolate a perspective in one dimension property", () => {
      let from = "perspective(-2vh)";
      let to_ = "perspective(-11vh)";

      Expect.(
        expect(
          Interpolate_transform.remapTransform(
            ~range=(0., 150.),
            ~domain=(from, to_),
            ~value=75.,
          ),
        )
        |> toEqual("perspective(-6.5vh)")
      );
    });
  });
});