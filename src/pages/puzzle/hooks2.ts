import {
  PuzzleProblemState,
  PuzzleRulesState,
  PuzzleTestResultsState,
  PuzzleTestsState,
} from "../../states2";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { useCallback } from "react";
import { lSystem } from "../../core/LSystem";
import { useInterval } from "../../hooks/useInterval";
import { zip } from "../../utils/array";

export type PuzzleTestStatus = "untested" | "testing" | "succeeded" | "failed";
export const usePuzzleTestStatuses = (): PuzzleTestStatus[] => {
  const puzzleTests = useRecoilValue(PuzzleTestsState);
  const puzzleTestResults = useRecoilValue(PuzzleTestResultsState);
  return zip(puzzleTests, puzzleTestResults).map(
    ([{ expect }, puzzleTestResult]) => {
      if (puzzleTestResult == null) return "untested";
      if (
        puzzleTestResult.resultForAnimation?.length !==
        puzzleTestResult.result.length
      )
        return "testing";
      return puzzleTestResult.result === expect ? "succeeded" : "failed";
    }
  );
};

export const useRunPuzzleTest = () => {
  const puzzleProblem = useRecoilValue(PuzzleProblemState);
  const puzzleRules = useRecoilValue(PuzzleRulesState);
  const puzzleTests = useRecoilValue(PuzzleTestsState);
  const puzzleTestStatuses = usePuzzleTestStatuses();
  const setPuzzleTestResults = useSetRecoilState(PuzzleTestResultsState);

  useInterval(
    () => {
      setPuzzleTestResults((puzzleTestResults) => {
        return puzzleTestResults.map((puzzleTestResult) => {
          if (puzzleTestResult == null) return null;
          return {
            result: puzzleTestResult.result,
            resultForAnimation: puzzleTestResult.result.slice(
              0,
              (puzzleTestResult.resultForAnimation?.length ?? 0) + 1
            ),
          };
        });
      });
    },
    puzzleTestStatuses.some((status) => status === "testing") ? 10 : null
  );

  return useCallback(() => {
    if (puzzleProblem == null) return;
    setPuzzleTestResults(
      puzzleTests.map((puzzleTest) => {
        const result = lSystem.exec(
          puzzleProblem.input,
          puzzleRules,
          puzzleTest.step
        );
        return {
          result,
        };
      })
    );
  }, [puzzleProblem, puzzleRules, puzzleTests, setPuzzleTestResults]);
};

export const useStopPuzzleTesting = () => {
  const setPuzzleTestResults = useSetRecoilState(PuzzleTestResultsState);
  return useCallback(() => {
    setPuzzleTestResults((puzzleTestResults) =>
      puzzleTestResults.map(() => null)
    );
  }, [setPuzzleTestResults]);
};
