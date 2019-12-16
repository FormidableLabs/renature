open Jest;

let it = test;

describe("Interpolate_color", () => {
  describe("lerpColorRGBA", () =>
    it("should linearly interpolate between two colors", () => {
      let a = Interpolate_color.{r: 0., g: 0., b: 0., a: 0.};

      let b = Interpolate_color.{r: 100., g: 200., b: 255., a: 0.6};

      Expect.(
        expect(
          Interpolate_color.lerpColorRGBA(~acc=a, ~target=b, ~roundness=0.5),
        )
        |> toEqual(Interpolate_color.{r: 50., g: 100., b: 127.5, a: 0.3})
      );
    })
  );

  describe("remapColor", () =>
    it("should map an input numeric range to an output color domain", () => {
      let a = Interpolate_color.{r: 0., g: 0., b: 0., a: 0.};

      let b = Interpolate_color.{r: 100., g: 200., b: 255., a: 0.6};

      Expect.(
        expect(
          Interpolate_color.remapColor(
            ~range=(0., 150.),
            ~domain=(a, b),
            ~value=75.,
          ),
        )
        |> toEqual("rgba(50, 100, 127, 0.3)")
      );
    })
  );
});