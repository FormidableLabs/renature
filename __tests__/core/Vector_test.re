open Jest;

let it = test;

describe("Vector", () => {
  // Test constants.
  let v1Int: Vector.t(int) = (5, 6);
  let v2Int: Vector.t(int) = (7, (-2));

  let v1Float: Vector.t(float) = (5.4, 6.8);
  let v2Float: Vector.t(float) = (7.2, (-2.6));

  let sInt: int = 8;
  let sFloat: float = 8.25;

  let roundness: float = 0.5;

  // Begin tests.
  describe("add", () =>
    it(
      "should expose a function for adding two vectors composed of integer values",
      () =>
      Expect.(expect(Vector.add(~v1=v1Int, ~v2=v2Int)) |> toEqual((12, 4)))
    )
  );

  describe("addf", () => {
    it(
      "should expose a function for adding two vectors composed of float values (x value)",
      () =>
      Expect.(
        expect(Vector.addf(~v1=v1Float, ~v2=v2Float) |> fst)
        |> toBeCloseTo(12.6)
      )
    );

    it(
      "should expose a function for adding two vectors composed of float values (y value)",
      () =>
      Expect.(
        expect(Vector.addf(~v1=v1Float, ~v2=v2Float) |> snd)
        |> toBeCloseTo(4.2)
      )
    );
  });

  describe("sub", () =>
    it(
      "should expose a function for subtracting two vectors composed of integer values",
      () =>
      Expect.(
        expect(Vector.sub(~v1=v1Int, ~v2=v2Int)) |> toEqual(((-2), 8))
      )
    )
  );

  describe("subf", () => {
    it(
      "should expose a function for subtracting two vectors composed of float values (x value)",
      () =>
      Expect.(
        expect(Vector.subf(~v1=v1Float, ~v2=v2Float) |> fst)
        |> toBeCloseTo(-1.8)
      )
    );

    it(
      "should expose a function for subtracting two vectors composed of float values (y value)",
      () =>
      Expect.(
        expect(Vector.subf(~v1=v1Float, ~v2=v2Float) |> snd)
        |> toBeCloseTo(9.4)
      )
    );
  });

  describe("mult", () =>
    it(
      "should expose a function for multiplying an integer vector by an integer scalar",
      () =>
      Expect.(expect(Vector.mult(~v=v1Int, ~s=sInt)) |> toEqual((40, 48)))
    )
  );

  describe("multf", () => {
    it(
      "should expose a function for multiplying a float vector by a float scalar (x value)",
      () =>
      Expect.(
        expect(Vector.multf(~v=v1Float, ~s=sFloat) |> fst)
        |> toBeCloseTo(44.55)
      )
    );

    it(
      "should expose a function for multiplying a float vector by a float scalar (y value)",
      () =>
      Expect.(
        expect(Vector.multf(~v=v1Float, ~s=sFloat) |> snd)
        |> toBeCloseTo(56.1)
      )
    );
  });

  describe("div", () =>
    it(
      "should expose a function for dividing an integer vector by an integer scalar (x value)",
      () =>
      Expect.(expect(Vector.div(~v=v1Int, ~s=sInt)) |> toEqual((0, 0)))
    )
  );

  describe("divf", () => {
    it(
      "should expose a function for dividing a float vector by a float scalar (x value)",
      () =>
      Expect.(
        expect(Vector.divf(~v=v1Float, ~s=sFloat) |> fst)
        |> toBeSoCloseTo(0.65, ~digits=2)
      )
    );

    it(
      "should expose a function for dividing a float vector by a float scalar (y value)",
      () =>
      Expect.(
        expect(Vector.divf(~v=v1Float, ~s=sFloat) |> snd)
        |> toBeSoCloseTo(0.82, ~digits=2)
      )
    );
  });

  describe("mag", () =>
    it(
      "should expose a function for deriving the magnitude of an integer vector",
      () =>
      Expect.(expect(Vector.mag(v1Int)) |> toBeSoCloseTo(8., ~digits=0))
    )
  );

  describe("magf", () =>
    it(
      "should expose a function for deriving the magnitude of a float vector",
      () =>
      Expect.(expect(Vector.magf(v1Float)) |> toBeSoCloseTo(8.7, ~digits=1))
    )
  );

  describe("norm", () => {
    it(
      "should expose a function for normalizing an integer vector to a unit vector (magnitude of 1, x value)",
      () =>
      Expect.(
        expect(Vector.norm(v1Int) |> fst) |> toBeSoCloseTo(0.6, ~digits=1)
      )
    );

    it(
      "should expose a function for normalizing an integer vector to a unit vector (magnitude of 1, y value)",
      () =>
      Expect.(
        expect(Vector.norm(v1Int) |> snd) |> toBeSoCloseTo(0.8, ~digits=1)
      )
    );
  });

  describe("normf", () => {
    it(
      "should expose a function for normalizing an integer vector to a unit vector (magnitude of 1, x value)",
      () =>
      Expect.(
        expect(Vector.normf(v1Float) |> fst)
        |> toBeSoCloseTo(0.62, ~digits=2)
      )
    );

    it(
      "should expose a function for normalizing an integer vector to a unit vector (magnitude of 1, y value)",
      () =>
      Expect.(
        expect(Vector.normf(v1Float) |> snd)
        |> toBeSoCloseTo(0.78, ~digits=2)
      )
    );
  });

  describe("lerp", () =>
    it(
      "should expose a function for linearly interpolating between two integer vectors",
      () =>
      Expect.(
        expect(Vector.lerpV(~acc=v1Int, ~target=v2Int, ~roundness))
        |> toEqual((6, 2))
      )
    )
  );

  describe("lerpf", () => {
    it(
      "should expose a function for linearly interpolating between two float vectors (x value)",
      () =>
      Expect.(
        expect(
          Vector.lerpfV(~acc=v1Float, ~target=v2Float, ~roundness) |> fst,
        )
        |> toBeCloseTo(6.3)
      )
    );

    it(
      "should expose a function for linearly interpolating between two float vectors (y value)",
      () =>
      Expect.(
        expect(
          Vector.lerpfV(~acc=v1Float, ~target=v2Float, ~roundness) |> snd,
        )
        |> toBeCloseTo(2.1)
      )
    );
  });
});