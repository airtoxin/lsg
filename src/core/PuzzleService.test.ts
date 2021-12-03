import { Puzzle } from "./puzzles";
import { puzzleService } from "./PuzzleService";

describe("PuzzleService", () => {
  const createDefaultContext = () => {
    const puzzle: Puzzle = {
      id: "random_id",
      description: "sample puzzle",
      input: "ABC",
      rules: [
        { from: "A", to: "B" },
        { from: "B", to: "C" },
        { from: "C", to: "D" },
      ],
      tests: [
        { isAny: false, step: 1, expect: "BCD", result: "A" },
        { isAny: false, step: 2, expect: "CDD", result: "B" },
        { isAny: false, step: 3, expect: "DDD" },
      ],
    };
    return { puzzle };
  };

  describe("test", () => {
    it("全テストが成功する場合は true を返すこと", () => {
      const { puzzle } = createDefaultContext();
      expect(puzzleService.test(puzzle)).toBe(true);
    });

    it("1つでもテストが失敗する場合は false を返すこと", () => {
      const { puzzle } = createDefaultContext();
      puzzle.tests.push({ isAny: false, step: 4, expect: "AAA" });
      expect(puzzleService.test(puzzle)).toBe(false);
    });

    it("isAny = true のステップは expect が何であれ結果に影響しないこと", () => {
      const { puzzle } = createDefaultContext();
      puzzle.tests.push({ isAny: true, step: 4, expect: "AAA" });
      expect(puzzleService.test(puzzle)).toBe(true);
    });
  });

  describe("sanitizeForSave", () => {
    it("test のユーザー入力に関する部分の値を削除すること", () => {
      const { puzzle } = createDefaultContext();
      expect(puzzleService.sanitizeForSave(puzzle).tests).toEqual([
        { isAny: false, step: 1, expect: "BCD" },
        { isAny: false, step: 2, expect: "CDD" },
        { isAny: false, step: 3, expect: "DDD" },
      ]);
    });
  });

  describe("sanitizeForPuzzle", () => {
    it("test のユーザー入力に関する部分の値と rule の to を削除すること", () => {
      const { puzzle } = createDefaultContext();
      const result = puzzleService.sanitizeForPuzzle(puzzle);
      expect(result.tests).toEqual([
        { isAny: false, step: 1, expect: "BCD" },
        { isAny: false, step: 2, expect: "CDD" },
        { isAny: false, step: 3, expect: "DDD" },
      ]);
      expect(result.rules).toEqual([
        { fixed: false, from: "A", to: "" },
        { fixed: false, from: "B", to: "" },
        { fixed: false, from: "C", to: "" },
      ]);
    });

    it("rule が fixed = true の場合は rule の to は削除しないこと", () => {
      const { puzzle } = createDefaultContext();
      puzzle.rules = [
        { fixed: true, from: "A", to: "B" },
        { fixed: true, from: "B", to: "C" },
        { fixed: true, from: "C", to: "D" },
      ];
      expect(puzzleService.sanitizeForPuzzle(puzzle).rules).toEqual([
        { fixed: true, from: "A", to: "B" },
        { fixed: true, from: "B", to: "C" },
        { fixed: true, from: "C", to: "D" },
      ]);
    });
  });
});
