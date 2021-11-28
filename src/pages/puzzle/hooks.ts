import { useCallback, useMemo, useRef } from "react";
import { Puzzle } from "../../core/puzzles";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { PuzzleState, PuzzleSuccessState } from "../../states";
import { lSystem } from "../../core/LSystem";

export const useSetPuzzleByKv = () => {
  const setPuzzle = useSetRecoilState(PuzzleState);
  return useCallback(
    <K extends keyof Puzzle>(
      key: K,
      value: Puzzle[K] | ((current: Puzzle[K], puzzle: Puzzle) => Puzzle[K])
    ) => {
      setPuzzle((puzzle) =>
        puzzle == null
          ? puzzle
          : {
              ...puzzle,
              [key]:
                typeof value === "function"
                  ? value(puzzle[key], puzzle)
                  : value,
            }
      );
    },
    [setPuzzle]
  );
};

export const usePuzzlePublishable = () => {
  const puzzle = useRecoilValue(PuzzleState);
  const puzzleSuccess = useRecoilValue(PuzzleSuccessState);
  return useMemo(
    () =>
      puzzleSuccess &&
      puzzle &&
      puzzle.tests.length > 0 &&
      puzzle.rules.length > 0 &&
      puzzle.input.length > 0,
    [puzzle, puzzleSuccess]
  );
};

export const useRunTest = () => {
  const setPuzzleByKv = useSetPuzzleByKv();
  const intervalRef = useRef(0);
  return useCallback(() => {
    clearInterval(intervalRef.current);
    setPuzzleByKv("tests", (tests, puzzle) =>
      tests.map((test) => {
        const result = lSystem.exec(puzzle.input, puzzle.rules, test.step);
        return {
          ...test,
          result,
          resultAnimationText: result.slice(0, 1),
        };
      })
    );
    intervalRef.current = window.setInterval(() => {
      setPuzzleByKv("tests", (tests) => {
        if (tests.every((test) => test.result === test.resultAnimationText)) {
          clearInterval(intervalRef.current);
        }
        return tests.map((test) => ({
          ...test,
          resultAnimationText: test.result?.slice(
            0,
            (test.resultAnimationText?.length ?? 0) + 1
          ),
        }));
      });
    }, 100);
  }, [setPuzzleByKv]);
};
