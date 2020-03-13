open Jest;

let it = test;

describe("Parse_unit", () => {
  describe("testUnit", () => {
    testAll(
      "should identify valid CSS unit values",
      [
        "20px",
        "1rem",
        "0.5em",
        "20%",
        "100vw",
        "25.50vh",
        "360deg",
        "22rad",
        "0.25turn",
        "-20%",
      ],
      unit_ => {
      Expect.(expect(Parse_unit.testUnit(unit_)) |> toBe(true))
    });

    testAll(
      "should flag invalid CSS unit values",
      ["20pe", "1oop", "0.5yet", "20", "0.5", "turn20", "deg230"],
      unit_ => {
      Expect.(expect(Parse_unit.testUnit(unit_)) |> toBe(false))
    });
  });

  describe("parseUnit", () => {
    it("should parse a raw string into a cssUnit record", () => {
      Expect.(
        expect(Parse_unit.parseUnit("20px"))
        |> toEqual(Parse_unit.{value: 20., unit: Js.Nullable.return("px")})
      )
    });

    it(
      "should mark a unit as null if the string can't be parsed into a cssUnit record",
      () => {
      Expect.(
        expect(Parse_unit.parseUnit("50rev"))
        |> toEqual(Parse_unit.{value: 50., unit: Js.Nullable.null})
      )
    });

    it("should mark a value as NaN if the string contains no numbers", () => {
      Expect.(
        expect(Parse_unit.parseUnit("px"))
        |> toEqual(
             Parse_unit.{
               value: Js.Float._NaN,
               unit: Js.Nullable.return("px"),
             },
           )
      )
    });

    it(
      "should mark a value as NaN and unit as null if the string contains no numbers and no css units",
      () => {
      Expect.(
        expect(Parse_unit.parseUnit("heck"))
        |> toEqual(Parse_unit.{value: Js.Float._NaN, unit: Js.Nullable.null})
      )
    });

    it("should preserve negative numbers", () => {
      Expect.(
        expect(Parse_unit.parseUnit("-2.5rem"))
        |> toEqual(
             Parse_unit.{value: (-2.5), unit: Js.Nullable.return("rem")},
           )
      )
    });
  });
});