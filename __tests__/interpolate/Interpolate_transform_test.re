open Jest;

let it = test;

describe("Interpolate_transform", () => {
  describe("parseTransformSingle", () => {
    it("should parse a transform into its transform property and value", () =>
      Expect.(
        expect(
          Interpolate_transform.parseTransformSingle("translateX(20px)"),
        )
        |> toEqual([|
             Interpolate_transform.{
               transformProperty: Js.Nullable.return("translateX"),
               transform: "20px",
             },
           |])
      )
    );

    it(
      "should handle translate, scale, rotate, skew, and perspective in one dimensions",
      () => {
        let translate = Interpolate_transform.parseTransformSingle(
                          "translateY(20px)",
                        )[0];
        let scale = Interpolate_transform.parseTransformSingle("scaleZ(0.5)")[0];
        let rotate = Interpolate_transform.parseTransformSingle(
                       "rotateX(0.5turn)",
                     )[0];
        let skew = Interpolate_transform.parseTransformSingle("skewZ(1.5rad)")[0];
        let perspective = Interpolate_transform.parseTransformSingle(
                            "perspective(10px)",
                          )[0];

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
      "should just return the raw string for an unknown translate property", () =>
      Expect.(
        expect(Interpolate_transform.parseTransformSingle("spin(20px)"))
        |> toEqual([|
             Interpolate_transform.{
               transformProperty: Js.Nullable.null,
               transform: "spin(20px)",
             },
           |])
      )
    );

    it(
      "should return the raw string if a value lacks an opening parenthesis",
      () =>
      Expect.(
        expect(Interpolate_transform.parseTransformSingle("scale1.2)"))
        |> toEqual([|
             Interpolate_transform.{
               transformProperty: Js.Nullable.null,
               transform: "scale1.2)",
             },
           |])
      )
    );

    it(
      "should return the raw string if a value lacks a closing parenthesis", () =>
      Expect.(
        expect(Interpolate_transform.parseTransformSingle("scale(1.2"))
        |> toEqual([|
             Interpolate_transform.{
               transformProperty: Js.Nullable.null,
               transform: "scale(1.2",
             },
           |])
      )
    );

    it("should handle multiple values inside a transform property", () =>
      Expect.(
        expect(
          Interpolate_transform.parseTransformSingle("translate(20px, 50px)"),
        )
        |> toEqual([|
             Interpolate_transform.{
               transformProperty: Js.Nullable.return("translate"),
               transform: "20px",
             },
             Interpolate_transform.{
               transformProperty: Js.Nullable.return("translate"),
               transform: "50px",
             },
           |])
      )
    );
  });

  describe("remapTransformSingle", () => {
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

  describe("splitTransform", () => {
    it(
      "should split a string with multiple transforms into its individual transforms",
      () =>
      Expect.(
        expect(
          Interpolate_transform.splitTransform(
            ~transform="translate(2px, 5px) scale(1.4)",
            (),
          ),
        )
        |> toEqual([|"translate(2px, 5px)", "scale(1.4)"|])
      )
    );

    it("should return an empty array for an invalid transform", () =>
      Expect.(
        expect(Interpolate_transform.splitTransform(~transform="200px", ()))
        |> toEqual([||])
      )
    );
  });

  describe("remapTransform", () => {
    it("should interpolate multiple transforms simultaneously", () => {
      let from = "translateX(45px) scaleX(1)";
      let to_ = "translateX(100px) scaleX(1.5)";

      Expect.(
        expect(
          Interpolate_transform.remapTransform(
            ~range=(0., 150.),
            ~domain=(from, to_),
            ~value=75.,
          ),
        )
        |> toEqual("translateX(72.5px) scaleX(1.25)")
      );
    });

    it(
      "should interpolate multiple transforms with x and y values simultaneously",
      () => {
      let from = "translate(45px, 100px) scale(1, 5)";
      let to_ = "translate(100px, 20px) scale(1.5, 25)";

      Expect.(
        expect(
          Interpolate_transform.remapTransform(
            ~range=(0., 150.),
            ~domain=(from, to_),
            ~value=75.,
          ),
        )
        |> toEqual("translate(72.5px, 60px) scale(1.25, 15)")
      );
    });
  });
});