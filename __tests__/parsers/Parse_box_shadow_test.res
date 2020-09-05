open Jest

let it = test

describe("Parse_box_shadow", () => {
  describe("testBoxShadow", () => {
    testAll(
      "should test a raw string to verify that it's a valid box-shadow",
      list{
        "10px 10px",
        "10px 10px 10px",
        "10px 10px 10px 10px",
        "10px 10px #566566",
        "10px 10px 10px #566566",
        "10px 10px 10px 10px #566566",
        "inset 10px 10px",
        "inset 10px 10px 10px",
        "inset 10px 10px 10px 10px",
        "inset 10px 10px #566566",
        "inset 10px 10px 10px #566566",
        "inset 10px 10px 10px 10px #566566",
        "10px 10px inset red",
        "10px 10px 10px rgba(0, 0, 0, 1)",
        "10px 10px inset 10px rgba(0, 0, 0, 1)",
        "none",
      },
      boxShadow => {
        open Expect
        expect(Parse_box_shadow.testBoxShadow(boxShadow)) |> toBe(true)
      },
    )

    testAll(
      "should flag strings that are not valid box shadows",
      list{"10px", "inset 10px", "heck", "10px 10px 10px 10px 10px"},
      boxShadow => {
        open Expect
        expect(Parse_box_shadow.testBoxShadow(boxShadow)) |> toBe(false)
      },
    )
  })

  describe("testBoxShadows", () =>
    testAll(
      "should handle comma separated box-shadows",
      list{"10px 10px rgba(0, 0, 0, 1), -5px -5px -5px #ffffff"},
      boxShadows => {
        open Expect
        expect(Parse_box_shadow.testBoxShadows(boxShadows)) |> toBe(true)
      },
    )
  )

  describe("parseBoxShadow", () => {
    it("should parse a box-shadow into its discrete parts (offset-x, offset-y)", () => {
      open Expect
      expect(Parse_box_shadow.parseBoxShadow("10px 5px red")) |> toEqual({
        open Parse_box_shadow
        {
          offsetX: "10px",
          offsetY: "5px",
          blur: "0px",
          spread: "0px",
          color: "red",
          inset: false,
        }
      })
    })

    it(
      "should parse a box-shadow into its discrete parts (offset-x, offset-y, blur-radius)",
      () => {
        open Expect
        expect(Parse_box_shadow.parseBoxShadow("10px 5px 1rem #256542")) |> toEqual({
          open Parse_box_shadow
          {
            offsetX: "10px",
            offsetY: "5px",
            blur: "1rem",
            spread: "0px",
            color: "#256542",
            inset: false,
          }
        })
      },
    )

    it(
      "should parse a box-shadow into its discrete parts (offset-x, offset-y, blur-radius, spread-radius)",
      () => {
        open Expect
        expect(
          Parse_box_shadow.parseBoxShadow("10px 5px 1rem 0.5em rgba(255, 255, 255, 1)"),
        ) |> toEqual({
          open Parse_box_shadow
          {
            offsetX: "10px",
            offsetY: "5px",
            blur: "1rem",
            spread: "0.5em",
            color: "rgba(255, 255, 255, 1)",
            inset: false,
          }
        })
      },
    )

    it(
      "should parse a box-shadow into its discrete parts (offset-x, offset-y, blur-radius, spread-radius, inset)",
      () => {
        open Expect
        expect(Parse_box_shadow.parseBoxShadow("inset 10px 5px 1rem 0.5em teal")) |> toEqual({
          open Parse_box_shadow
          {
            offsetX: "10px",
            offsetY: "5px",
            blur: "1rem",
            spread: "0.5em",
            color: "teal",
            inset: true,
          }
        })
      },
    )
  })

  describe("parseBoxShadows", () =>
    it(
      "should parse a comma-delimited set of box-shadows into an array of box-shadow strings",
      () => {
        open Expect
        expect(
          Parse_box_shadow.parseBoxShadows("5% -5% 2px teal, inset 1.5rem 1.5rem 5% 10% #f2df45"),
        ) |> toEqual(["5% -5% 2px teal", "inset 1.5rem 1.5rem 5% 10% #f2df45"])
      },
    )
  )
})
