open Jest

let it = test

describe("FluidResistance", () => {
  describe("fluidResistanceForceMag", () =>
    it("should derive the magnitude of the drag force", () => {
      open Expect
      expect(
        FluidResistance.fluidResistanceForceMag(~rho=25., ~velocity=(5., 0.), ~area=2., ~cDrag=0.1),
      ) |> toEqual(62.5)
    })
  )

  describe("fluidResistanceForceV", () => {
    let rho = 25.
    let velocity = (0., 5.)
    let area = 2.
    let cDrag = 0.1

    it("should correctly derive the vector of the drag force in two dimensions", () => {
      open Expect
      expect(
        FluidResistance.fluidResistanceForceV(~rho, ~velocity, ~area, ~cDrag) |> fst,
      ) |> toEqual(-0.)
    })

    it("should correctly derive the vector of the drag force in two dimensions", () => {
      open Expect
      expect(
        FluidResistance.fluidResistanceForceV(~rho, ~velocity, ~area, ~cDrag) |> snd,
      ) |> toEqual(-62.5)
    })
  })

  describe("getFluidPositionAtTerminalVelocity", () => {
    let mass = 10.
    let rho = 25.
    let area = 2.
    let cDrag = 0.1

    it(
      "should correctly derive the position of the mover when it reaches terminal velocity",
      () => {
        open Expect
        expect(
          FluidResistance.getFluidPositionAtTerminalVelocity(~mass, ~rho, ~cDrag, ~area),
        ) |> toBeSoCloseTo(65.05, ~digits=2)
      },
    )
  })
})
