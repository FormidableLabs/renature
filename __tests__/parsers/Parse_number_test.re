open Jest;

let it = test;

describe("Parse_number", () => {
  describe("testNumber", () => {
    testAll(
      "should identify valid strings that can be represented as numbers, excluding unit values",
      ["5", "0.25"],
      number => {
      Expect.(expect(Parse_number.testNumber(number)) |> toBe(true))
    });

    testAll(
      "should flag strings that cannot be represented as numbers",
      ["20px", "hey", "oops", "twenty", "one23"],
      number => {
      Expect.(expect(Parse_number.testNumber(number)) |> toBe(false))
    });
  });

  describe("parseNumber", () => {
    it("should parse strings to their numeric representation", () => {
      Expect.(expect(Parse_number.parseNumber("20")) |> toEqual(20.))
    });

    it("should parse strings to their numeric representation – decimals", () => {
      Expect.(expect(Parse_number.parseNumber("0.25")) |> toEqual(0.25))
    });

    it(
      "should parse strings to their numeric representation – strip trailing zeros",
      () => {
      Expect.(expect(Parse_number.parseNumber("20.50")) |> toEqual(20.5))
    });

    it("should return NaN for un-parseable strings", () => {
      Expect.(
        expect(Parse_number.parseNumber("yeet")) |> toEqual(Js.Float._NaN)
      )
    });
  });
});