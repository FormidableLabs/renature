open Jest

let it = test

describe("Interpolate_transform", () => {
  describe("interpolateTransform", () => {
    it("should interpolate a translate in one dimension", () => {
      let from = "translateX(45px)"
      let to_ = "translateX(100px)"

      open Expect
      expect(
        Interpolate_transform.interpolateTransform(
          ~range=(0., 150.),
          ~domain=(from, to_),
          ~value=75.,
        ),
      ) |> toEqual("translateX(72.5px)")
    })

    it("should interpolate a scale in one dimension property", () => {
      let from = "scaleY(1)"
      let to_ = "scaleY(1.2)"

      open Expect
      expect(
        Interpolate_transform.interpolateTransform(
          ~range=(0., 150.),
          ~domain=(from, to_),
          ~value=75.,
        ),
      ) |> toEqual("scaleY(1.1)")
    })

    it("should interpolate a rotate in one dimension property", () => {
      let from = "rotate(10rad)"
      let to_ = "rotate(6rad)"

      open Expect
      expect(
        Interpolate_transform.interpolateTransform(
          ~range=(0., 150.),
          ~domain=(from, to_),
          ~value=75.,
        ),
      ) |> toEqual("rotate(8rad)")
    })

    it("should interpolate a skew in one dimension property", () => {
      let from = "skewX(5deg)"
      let to_ = "skewX(60deg)"

      open Expect
      expect(
        Interpolate_transform.interpolateTransform(
          ~range=(0., 150.),
          ~domain=(from, to_),
          ~value=75.,
        ),
      ) |> toEqual("skewX(32.5deg)")
    })

    it("should interpolate a perspective in one dimension property", () => {
      let from = "perspective(-2vh)"
      let to_ = "perspective(-11vh)"

      open Expect
      expect(
        Interpolate_transform.interpolateTransform(
          ~range=(0., 150.),
          ~domain=(from, to_),
          ~value=75.,
        ),
      ) |> toEqual("perspective(-6.5vh)")
    })

    it("should handle transforms with multiple dimensions", () => {
      let from = "translate(-2vh, 1.5vh)"
      let to_ = "translate(-8vh, 6.5vh)"

      open Expect
      expect(
        Interpolate_transform.interpolateTransform(
          ~range=(0., 150.),
          ~domain=(from, to_),
          ~value=75.,
        ),
      ) |> toEqual("translate(-5vh, 4vh)")
    })

    it("should handle 3D transforms", () => {
      let from = "translate3d(-2vh, 1.5vh, 1vw)"
      let to_ = "translate3d(-8vh, 6.5vh, 1.5vw)"

      open Expect
      expect(
        Interpolate_transform.interpolateTransform(
          ~range=(0., 150.),
          ~domain=(from, to_),
          ~value=75.,
        ),
      ) |> toEqual("translate3d(-5vh, 4vh, 1.25vw)")
    })

    it(
      "should handle the case where comma-separated values are not also separated by whitespace",
      () => {
        let from = "translate3d(-2vh,1.5vh,1vw)"
        let to_ = "translate3d(-8vh,6.5vh,1.5vw)"

        open Expect
        expect(
          Interpolate_transform.interpolateTransform(
            ~range=(0., 150.),
            ~domain=(from, to_),
            ~value=75.,
          ),
        ) |> toEqual("translate3d(-5vh, 4vh, 1.25vw)")
      },
    )

    it("should throw an error when the from transform can't be parsed", () => {
      let from = "not a transform"
      let to_ = "translateX(100px)"

      open Expect
      expect(() =>
        Interpolate_transform.interpolateTransform(
          ~range=(0., 150.),
          ~domain=(from, to_),
          ~value=75.,
        )
      ) |> toThrow
    })

    it("should throw an error when the to transform can't be parsed", () => {
      let from = "translateX(45px)"
      let to_ = "not a transform"

      open Expect
      expect(() =>
        Interpolate_transform.interpolateTransform(
          ~range=(0., 150.),
          ~domain=(from, to_),
          ~value=75.,
        )
      ) |> toThrow
    })

    it("should throw an error when the from and to transforms can't be parsed", () => {
      let from = "not a transform"
      let to_ = "still not a transform"

      open Expect
      expect(() =>
        Interpolate_transform.interpolateTransform(
          ~range=(0., 150.),
          ~domain=(from, to_),
          ~value=75.,
        )
      ) |> toThrow
    })
  })

  describe("interpolateTransforms", () => {
    it("should interpolate multiple transforms simultaneously", () => {
      let from = "translateX(45px) scaleX(1)"
      let to_ = "translateX(100px) scaleX(1.5)"
      open Expect
      expect(
        Interpolate_transform.interpolateTransforms(
          ~range=(0., 150.),
          ~domain=(from, to_),
          ~value=75.,
        ),
      ) |> toEqual("translateX(72.5px) scaleX(1.25)")
    })

    it("should interpolate multiple transforms with x and y values simultaneously", () => {
      let from = "translate(45px, 100px) scale(1, 5)"
      let to_ = "translate(100px, 20px) scale(1.5, 25)"
      open Expect
      expect(
        Interpolate_transform.interpolateTransforms(
          ~range=(0., 150.),
          ~domain=(from, to_),
          ~value=75.,
        ),
      ) |> toEqual("translate(72.5px, 60px) scale(1.25, 15)")
    })
  })

  it(
    "should match transforms regardless of order, respecting the order of transforms in the from property in the output",
    () => {
      let from = "translate(45px, 100px) scale(1, 5)"
      let to_ = "scale(1.5, 25) translate(100px, 20px)"

      open Expect
      expect(
        Interpolate_transform.interpolateTransforms(
          ~range=(0., 150.),
          ~domain=(from, to_),
          ~value=75.,
        ),
      ) |> toEqual("translate(72.5px, 60px) scale(1.25, 15)")
    },
  )
})
