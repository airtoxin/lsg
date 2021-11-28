import { useCallback, useEffect, useMemo, useRef } from "react";
import { Puzzle, Test } from "../../core/puzzles";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { PuzzleState, PuzzleSuccessState } from "../../states";
import { lSystem } from "../../core/LSystem";
import useSound from "use-sound";

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

export const usePuzzleTestable = () => {
  const puzzle = useRecoilValue(PuzzleState);
  return useMemo(
    () =>
      puzzle &&
      puzzle.input.length > 0 &&
      puzzle.tests.length > 0 &&
      puzzle.rules.length > 0 &&
      puzzle.rules.every((rule) => rule.from.length > 0),
    [puzzle]
  );
};

export const usePuzzleSuccessEffect = () => {
  const puzzleSuccess = useRecoilValue(PuzzleSuccessState);
  const [play] = useSound("/assets/success.wav", { interrupt: true });
  useEffect(() => {
    if (puzzleSuccess) setTimeout(play, 100);
  }, [play, puzzleSuccess]);
  return puzzleSuccess;
};

export const usePuzzlePublishable = () => {
  const puzzleSuccess = useRecoilValue(PuzzleSuccessState);
  const puzzleTestable = usePuzzleTestable();
  return useMemo(
    () => puzzleTestable && puzzleSuccess,
    [puzzleSuccess, puzzleTestable]
  );
};

export const usePuzzlePublishableEffect = () => {
  const [play] = useSound("/assets/success.wav", { interrupt: true });
  const puzzlePublishable = usePuzzlePublishable();
  useEffect(() => {
    if (puzzlePublishable) setTimeout(play, 100);
  }, [play, puzzlePublishable]);
  return puzzlePublishable;
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
          resultAnimationText: undefined,
        };
      })
    );
    setTimeout(() => {
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
    }, 0);
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
    }, 10);
  }, [setPuzzleByKv]);
};

export const useTestSuccess = (test: Test) => {
  const testSuccess = useMemo(
    () =>
      test.result == null ||
      test.resultAnimationText == null ||
      test.result !== test.resultAnimationText
        ? undefined
        : test.result === test.expect,
    [test.expect, test.result, test.resultAnimationText]
  );
  const [playOk] = useSound("/assets/ok.wav", { interrupt: true });
  const [playNg] = useSound("/assets/ng.wav", { interrupt: true });
  useEffect(() => {
    if (testSuccess != null) {
      testSuccess ? playOk() : playNg();
    }
  }, [playNg, playOk, testSuccess]);

  return testSuccess;
};
