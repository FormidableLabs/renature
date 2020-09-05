open Jest

let it = test

describe("Interpolate_color", () => {
  describe("lerpColor", () => it("should linearly interpolate between two colors", () => {
      let a = {
        open Parse_color
        {r: 0., g: 0., b: 0., a: 0.}
      }

      let b = {
        open Parse_color
        {r: 100., g: 200., b: 255., a: 0.6}
      }

      open Expect
      expect(Interpolate_color.lerpColor(~acc=a, ~target=b, ~roundness=0.5)) |> toEqual({
        open Parse_color
        {r: 50., g: 100., b: 127.5, a: 0.3}
      })
    }))

  describe("interpolateColor", () =>
    it("should map an input numeric range to an output color domain", () => {
      let a = {
        open Parse_color
        {r: 0., g: 0., b: 0., a: 0.}
      }

      let b = {
        open Parse_color
        {r: 100., g: 200., b: 255., a: 0.6}
      }

      open Expect
      expect(
        Interpolate_color.interpolateColor(~range=(0., 150.), ~domain=(a, b), ~value=75.),
      ) |> toEqual("rgba(50, 100, 127, 0.3)")
    })
  )
})
