import { useCallback, useEffect, useMemo, useRef } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  PuzzleState,
  PuzzleSuccessState,
  PuzzleTestResult,
  PuzzleTestResultsState,
} from "../../states";
import { lSystem } from "../../core/LSystem";
import useSound from "use-sound";
import { Puzzle } from "../../types.gen";

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

export const useRunTest = (
  puzzle: Pick<Puzzle, "input" | "rules" | "tests">
) => {
  const { input, rules, tests } = puzzle;
  const [puzzleTestsResult, setPuzzleTestsResult] = useRecoilState(
    PuzzleTestResultsState
  );
  const intervalRef = useRef(0);
  return useCallback(() => {
    clearInterval(intervalRef.current);
    setPuzzleTestsResult(
      tests.map((test) => {
        const result = lSystem.exec(input, rules, test.step);
        return {
          test,
          result,
          resultAnimationText: undefined,
        };
      })
    );
    setTimeout(() => {
      setPuzzleTestsResult(
        tests.map((test) => {
          const result = lSystem.exec(input, rules, test.step);
          return {
            test,
            result,
            resultAnimationText: result.slice(0, 1),
          };
        })
      );
    }, 0);
    intervalRef.current = window.setInterval(() => {
      if (
        puzzleTestsResult.every(
          (testResult) => testResult.result === testResult.resultAnimationText
        )
      ) {
        clearInterval(intervalRef.current);
      }

      setPuzzleTestsResult((puzzleTestsResult) =>
        puzzleTestsResult.map((puzzleTestResult) => ({
          ...puzzleTestResult,
          resultAnimationText: puzzleTestResult.result?.slice(
            0,
            (puzzleTestResult.resultAnimationText?.length ?? 0) + 1
          ),
        }))
      );
    }, 10);
  }, [input, puzzleTestsResult, rules, setPuzzleTestsResult, tests]);
};

export const useTestSuccess = (puzzleTestResult: PuzzleTestResult) => {
  const testSuccess = useMemo(
    () =>
      puzzleTestResult.result == null ||
      puzzleTestResult.resultAnimationText == null ||
      puzzleTestResult.result !== puzzleTestResult.resultAnimationText
        ? undefined
        : puzzleTestResult.result === puzzleTestResult.test.expect,
    [
      puzzleTestResult.test.expect,
      puzzleTestResult.result,
      puzzleTestResult.resultAnimationText,
    ]
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
