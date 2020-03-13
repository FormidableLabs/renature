open Jest;

let it = test;

describe("Parse_color", () => {
  describe("testColor", () => {
    testAll(
      "should identify valid CSS colors",
      ["rgba(0, 0, 0, 1)", "#ffffff", "hsla(200, 100%, 30%, 0.5)", "teal"],
      color => {
      Expect.(expect(Parse_color.testColor(color)) |> toBe(true))
    });

    testAll(
      "should flag valid CSS colors",
      ["rgba(0, 30%, 0, 1)", "#fffff", "hsla(200, 10, 30%, 0.5)", "yeet"],
      color => {
      Expect.(expect(Parse_color.testColor(color)) |> toBe(false))
    });
  })
});