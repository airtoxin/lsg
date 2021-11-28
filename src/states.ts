import { atom, selector } from "recoil";
import { Puzzle } from "./core/puzzles";

export const PuzzleState = atom<Puzzle | undefined>({
  key: "PuzzleState",
  default: undefined,
});

export const PuzzleSuccessState = selector({
  key: "PuzzleSuccessState",
  get: ({ get }) => {
    const problem = get(PuzzleState);
    return problem == null
      ? undefined
      : problem.tests.every(
          (test) =>
            test.result != null &&
            test.resultAnimationText != null &&
            test.result === test.expect &&
            test.resultAnimationText === test.expect
        );
  },
});
