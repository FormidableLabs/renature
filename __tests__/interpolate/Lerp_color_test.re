open Jest;

let it = test;

describe("Lerp_color", () =>
  describe("lerpColorRGBA", () =>
    it("should linearly interpolate between two colors", () => {
      let a = Lerp_color.{r: 0., g: 0., b: 0., a: 0.};

      let b = Lerp_color.{r: 100., g: 200., b: 255., a: 0.6};

      Expect.(
        expect(Lerp_color.lerpColorRGBA(~acc=a, ~target=b, ~roundness=0.5))
        |> toEqual(Lerp_color.{r: 50., g: 100., b: 127.5, a: 0.3})
      );
    })
  )
);