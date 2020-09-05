open Jest

let it = test

describe("Math", () => {
  describe("constrainf", () => {
    it("should constrain a value above the range to the upper limit of the range", () => {
      open Expect
      expect(Math.constrainf(~low=10., ~high=50., 70.)) |> toEqual(50.)
    })

    it("should constrain a value below the range to the lower limit of the range", () => {
      open Expect
      expect(Math.constrainf(~low=10., ~high=50., 1.)) |> toEqual(10.)
    })

    it("should leave values within the range untouched", () => {
      open Expect
      expect(Math.constrainf(~low=10., ~high=50., 40.)) |> toEqual(40.)
    })
  })

  describe("lerpf", () => it("should linear interpolate between float values", () => {
      open Expect
      expect(Math.lerpf(~acc=5., ~target=25., ~roundness=0.35)) |> toEqual(12.)
    }))

  describe("remapf", () => {
    it("should map a value on an input range to a value on an output domain", () => {
      open Expect
      expect(Math.remapf(~range=(0., 300.), ~domain=(0., 1.), ~value=150.)) |> toEqual(0.5)
    })

    it("should handle ranges and domains with non-overlapping inputs", () => {
      open Expect
      expect(Math.remapf(~range=(200., 300.), ~domain=(10., 15.), ~value=220.)) |> toEqual(11.)
    })

    it("should extrapolate outside the input range", () => {
      open Expect
      expect(Math.remapf(~range=(200., 300.), ~domain=(10., 15.), ~value=180.)) |> toEqual(9.)
    })

    it("should handle a negative input range", () => {
      open Expect
      expect(Math.remapf(~range=(-200., -300.), ~domain=(10., 15.), ~value=-220.)) |> toEqual(11.)
    })
  })

  describe("normalizef", () => {
    it("should map a number on an input range to a value in the domain [0, 1]", () => {
      open Expect
      expect(Math.normalizef(~range=(0., 300.), ~value=150.)) |> toEqual(0.5)
    })

    it("should extrapolate outside the input range", () => {
      open Expect
      expect(Math.normalizef(~range=(200., 300.), ~value=150.)) |> toEqual(-0.5)
    })

    it("should handle a negative input range", () => {
      open Expect
      expect(Math.normalizef(~range=(-200., -300.), ~value=-250.)) |> toEqual(0.5)
    })
  })
})
