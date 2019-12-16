import { parsePairs } from "../../src/helpers/pairs";

describe("pairs", () => {
  describe("parsePairs", () => {
    it("should parse a from / to pair to its property and value representations", () => {
      const pair = { from: { opacity: 0 }, to: { opacity: 1 } };
      expect(parsePairs(pair)).toEqual({
        from: { property: "opacity", value: 0 },
        to: { property: "opacity", value: 1 }
      });
    });
  });
});
