open Jest

let it = test

describe("Force", () => describe("applyForce", () => {
    let force = (10., 5.)
    let entity = {
      open Force
      {
        acceleration: (0., 0.),
        velocity: (0., 0.),
        position: (0., 0.),
        mass: 100.,
      }
    }

    it("should alter an entity's x acceleration", () => {
      open Expect
      expect(Force.applyForce(~force, ~entity, ~time=0.001).acceleration |> fst) |> toBeCloseTo(0.1)
    })

    it("should alter an entity's y acceleration", () => {
      open Expect
      expect(Force.applyForce(~force, ~entity, ~time=0.001).acceleration |> snd) |> toBeCloseTo(
        0.05,
      )
    })

    it("should alter an entity's x velocity", () => {
      open Expect
      expect(Force.applyForce(~force, ~entity, ~time=0.001).velocity |> fst) |> toBeCloseTo(0.0001)
    })

    it("should alter an entity's y velocity", () => {
      open Expect
      expect(Force.applyForce(~force, ~entity, ~time=0.001).velocity |> snd) |> toBeCloseTo(0.00005)
    })

    it("should alter an entity's x position", () => {
      open Expect
      expect(Force.applyForce(~force, ~entity, ~time=0.001).position |> fst) |> toBeCloseTo(
        0.00000001,
      )
    })

    it("should alter an entity's y position", () => {
      open Expect
      expect(Force.applyForce(~force, ~entity, ~time=0.001).position |> snd) |> toBeCloseTo(
        0.000000005,
      )
    })
  }))
