import { puzzles } from "./puzzles";
import { lSystem } from "./LSystem";

describe("puzzles solutions", () => {
  it("Problem 1", () => {
    const puzzle = puzzles[0]!;
    for (const test of puzzle.tests.filter((test) => !test.isAny)) {
      expect(
        lSystem.exec(puzzle.input, [{ from: "A", to: "B" }], test.step)
      ).toBe(test.expect);
    }
  });

  it("Problem 2", () => {
    const puzzle = puzzles[1]!;
    for (const test of puzzle.tests.filter((test) => !test.isAny)) {
      expect(
        lSystem.exec(
          puzzle.input,
          [
            { from: "A", to: "C" },
            { from: "B", to: "B" },
            { from: "C", to: "A" },
          ],
          test.step
        )
      ).toBe(test.expect);
    }
  });

  it("Problem 3", () => {
    const puzzle = puzzles[2]!;
    for (const test of puzzle.tests.filter((test) => !test.isAny)) {
      expect(
        lSystem.exec(
          puzzle.input,
          [
            { from: "A", to: "A" },
            { from: "B", to: "" },
          ],
          test.step
        )
      ).toBe(test.expect);
    }
  });

  it("Problem 4", () => {
    const puzzle = puzzles[3]!;
    for (const test of puzzle.tests.filter((test) => !test.isAny)) {
      expect(
        lSystem.exec(
          puzzle.input,
          [
            { from: "A", to: "B" },
            { from: "B", to: "BA" },
          ],
          test.step
        )
      ).toBe(test.expect);
    }
  });

  it("Problem 5", () => {
    const puzzle = puzzles[4]!;
    for (const test of puzzle.tests.filter((test) => !test.isAny)) {
      expect(
        lSystem.exec(
          puzzle.input,
          [
            { from: "A", to: "ABB" },
            { from: "B", to: "A" },
          ],
          test.step
        )
      ).toBe(test.expect);
    }
  });

  it("Problem 6", () => {
    const puzzle = puzzles[5]!;
    for (const test of puzzle.tests.filter((test) => !test.isAny)) {
      expect(
        lSystem.exec(
          puzzle.input,
          [
            { from: "A", to: "" },
            { from: "B", to: "AC" },
            { from: "C", to: "A" },
          ],
          test.step
        )
      ).toBe(test.expect);
    }
  });

  it("Problem 7", () => {
    const puzzle = puzzles[6]!;
    for (const test of puzzle.tests.filter((test) => !test.isAny)) {
      expect(
        lSystem.exec(
          puzzle.input,
          [
            { from: "A", to: "AA" },
            { from: "B", to: "AB" },
          ],
          test.step
        )
      ).toBe(test.expect);
    }
  });

  it("Problem 8", () => {
    const puzzle = puzzles[7]!;
    for (const test of puzzle.tests.filter((test) => !test.isAny)) {
      expect(
        lSystem.exec(
          puzzle.input,
          [
            { from: "A", to: "ACAB" },
            { from: "B", to: "" },
            { from: "C", to: "AC" },
          ],
          test.step
        )
      ).toBe(test.expect);
    }
  });

  it("Problem 9", () => {
    const puzzle = puzzles[8]!;
    for (const test of puzzle.tests.filter((test) => !test.isAny)) {
      expect(
        lSystem.exec(
          puzzle.input,
          [
            { from: "A", to: "" },
            { from: "B", to: "" },
            { from: "C", to: "ABC" },
          ],
          test.step
        )
      ).toBe(test.expect);
    }
  });

  it("Problem 10", () => {
    const puzzle = puzzles[9]!;
    for (const test of puzzle.tests.filter((test) => !test.isAny)) {
      expect(
        lSystem.exec(
          puzzle.input,
          [
            { from: "A", to: "BBB" },
            { from: "B", to: "C" },
            { from: "C", to: "A" },
          ],
          test.step
        )
      ).toBe(test.expect);
    }
  });
});
