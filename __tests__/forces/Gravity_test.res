open Jest

let it = test

describe("Gravity", () => {
  describe("force", () => {
    it("should derive the force of gravity between two objects", () => {
      open Expect
      expect(Gravity.gravityForceMag(~attractorMass=1., ~moverMass=1., ~r=1., ())) |> toBeCloseTo(
        Gravity.gU,
      )
    })

    it("should correctly derive the force of gravity at the Earth's surface", () => {
      let massEarth = 5.97 *. 10. ** 24.
      let massObject = 25.
      let rEarth = 6.371 *. 10. ** 6.

      open Expect
      expect(
        Gravity.gravityForceMag(
          ~attractorMass=massEarth,
          ~moverMass=massObject,
          ~r=rEarth,
          (),
        ) |> Printf.printf("%0.*f\n", 2),
      ) |> toEqual(0.098 *. massObject |> Printf.printf("%0.*f\n", 2))
    })

    it("should allow for user-supplied values of G", () => {
      open Expect
      expect(
        Gravity.gravityForceMag(~attractorMass=1., ~moverMass=1., ~r=1., ~g=5., ()),
      ) |> toBeCloseTo(5.)
    })
  })

  describe("gravityForceV", () => {
    let attractorMass = 25.
    let moverMass = 50.
    let attractor = (5., 10.)
    let mover = (20., 50.)

    it("should correctly derive the vector of the force of gravity in two dimensions", () => {
      open Expect
      expect(
        Gravity.gravityForceV(~attractorMass, ~moverMass, ~attractor, ~mover, ()) |> fst,
      ) |> toBeCloseTo(-0.00002680847)
    })

    it("should correctly derive the vector of the force of gravity in two dimensions", () => {
      open Expect
      expect(
        Gravity.gravityForceV(~attractorMass, ~moverMass, ~attractor, ~mover, ()) |> snd,
      ) |> toBeCloseTo(-0.0000714892571)
    })

    it("should respect user-supplied values of G (x value)", () => {
      open Expect
      expect(
        Gravity.gravityForceV(~attractorMass, ~moverMass, ~attractor, ~mover, ~g=1., ()) |> fst,
      ) |> toBeCloseTo(-0.2404926216)
    })

    it("should respect user-supplied values of G (y value)", () => {
      open Expect
      expect(
        Gravity.gravityForceV(~attractorMass, ~moverMass, ~attractor, ~mover, ~g=1., ()) |> snd,
      ) |> toBeCloseTo(-0.6413136576)
    })

    it(
      "should respect user-supplied threshold parameters for two dimensional motion (x value)",
      () => {
        open Expect
        expect(
          Gravity.gravityForceV(
            ~attractorMass,
            ~moverMass,
            ~attractor,
            ~mover,
            ~threshold=(10., 40.),
            (),
          ) |> fst,
        ) |> toBeCloseTo(-0.0000234313)
      },
    )

    it(
      "should respect user-supplied threshold parameters for two dimensional motion (y value)",
      () => {
        open Expect
        expect(
          Gravity.gravityForceV(
            ~attractorMass,
            ~moverMass,
            ~attractor,
            ~mover,
            ~threshold=(10., 40.),
            (),
          ) |> snd,
        ) |> toBeCloseTo(-0.0000624835)
      },
    )
  })
})
