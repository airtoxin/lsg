import { atom, selector } from "recoil";
import { Puzzle, PuzzleTest } from "./types.gen";
import { zip } from "./utils/array";

export type PuzzleTestResult = {
  test: Omit<PuzzleTest, "__typename">;
  result?: string;
  resultAnimationText?: string;
};
export const PuzzleTestResultsState = atom<PuzzleTestResult[]>({
  key: "PuzzleTestResult",
  default: [],
});

export const PuzzleState = atom<Puzzle | undefined>({
  key: "PuzzleState",
  default: undefined,
});

export const PuzzleSuccessState = selector({
  key: "PuzzleSuccessState",
  get: ({ get }) => {
    const problem = get(PuzzleState);
    const puzzleTestResults = get(PuzzleTestResultsState);
    return problem == null
      ? undefined
      : zip(problem.tests, puzzleTestResults).every(
          ([test, testResult]) =>
            testResult.result != null &&
            testResult.resultAnimationText != null &&
            testResult.result === test.expect &&
            testResult.resultAnimationText === test.expect
        );
  },
});
