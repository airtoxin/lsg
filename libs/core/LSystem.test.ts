import { lSystem } from "./LSystem";

describe("LSystem", () => {
  describe("exec", () => {
    // https://en.wikipedia.org/wiki/L-system
    it("Algae", () => {
      const rules = [
        { from: "A", to: "AB" },
        { from: "B", to: "A" },
      ];
      expect(lSystem.exec("A", rules, 0)).toBe("A");
      expect(lSystem.exec("A", rules)).toBe("AB");
      expect(lSystem.exec("A", rules, 2)).toBe("ABA");
      expect(lSystem.exec("A", rules, 3)).toBe("ABAAB");
      expect(lSystem.exec("A", rules, 4)).toBe("ABAABABA");
      expect(lSystem.exec("A", rules, 5)).toBe("ABAABABAABAAB");
      expect(lSystem.exec("A", rules, 6)).toBe("ABAABABAABAABABAABABA");
      expect(lSystem.exec("A", rules, 7)).toBe(
        "ABAABABAABAABABAABABAABAABABAABAAB"
      );
    });

    it("Fractal (binary) tree", () => {
      const rules = [
        { from: "1", to: "11" },
        { from: "0", to: "1[0]0" },
      ];
      expect(lSystem.exec("0", rules, 0)).toBe("0");
      expect(lSystem.exec("0", rules)).toBe("1[0]0");
      expect(lSystem.exec("0", rules, 2)).toBe("11[1[0]0]1[0]0");
      expect(lSystem.exec("0", rules, 3)).toBe(
        "1111[11[1[0]0]1[0]0]11[1[0]0]1[0]0"
      );
    });

    it("Cantor set", () => {
      const rules = [
        { from: "A", to: "ABA" },
        { from: "B", to: "BBB" },
      ];
      expect(lSystem.exec("A", rules, 0)).toBe("A");
      expect(lSystem.exec("A", rules)).toBe("ABA");
      expect(lSystem.exec("A", rules, 2)).toBe("ABABBBABA");
      expect(lSystem.exec("A", rules, 3)).toBe("ABABBBABABBBBBBBBBABABBBABA");
    });

    it("Koch curve", () => {
      const rules = [{ from: "F", to: "F+F−F−F+F" }];
      expect(lSystem.exec("F", rules, 0)).toBe("F");
      expect(lSystem.exec("F", rules)).toBe("F+F−F−F+F");
      expect(lSystem.exec("F", rules, 2)).toBe(
        "F+F−F−F+F+F+F−F−F+F−F+F−F−F+F−F+F−F−F+F+F+F−F−F+F"
      );
      expect(lSystem.exec("F", rules, 3)).toBe(
        "F+F−F−F+F+F+F−F−F+F−F+F−F−F+F−F+F−F−F+F+F+F−F−F+F+F+F−F−F+F+F+F−F−F+F−F+F−F−F+F−F+F−F−F+F+F+F−F−F+F−F+F−F−F+F+F+F−F−F+F−F+F−F−F+F−F+F−F−F+F+F+F−F−F+F−F+F−F−F+F+F+F−F−F+F−F+F−F−F+F−F+F−F−F+F+F+F−F−F+F+F+F−F−F+F+F+F−F−F+F−F+F−F−F+F−F+F−F−F+F+F+F−F−F+F"
      );
    });
  });
});
