import { useEffect, VoidFunctionComponent } from "react";
import { PuzzlePageLayout } from "./PuzzlePageLayout";
import { useSetRecoilState } from "recoil";
import { PuzzleEditPane } from "./PuzzleEditPane";
import { SolutionEditPane } from "./SolutionEditPane";
import {
  PuzzleProblemState,
  PuzzleRulesState,
  PuzzleTestResultsState,
  PuzzleTestsState,
} from "../../states2";

export const EditPuzzlePage: VoidFunctionComponent = () => {
  const setPuzzleProblem = useSetRecoilState(PuzzleProblemState);
  const setPuzzleRules = useSetRecoilState(PuzzleRulesState);
  const setPuzzleTests = useSetRecoilState(PuzzleTestsState);
  const PuzzleTestResults = useSetRecoilState(PuzzleTestResultsState);
  useEffect(() => {
    setPuzzleProblem({
      description: "",
      input: "",
    });
    setPuzzleRules([]);
    setPuzzleTests([]);
    PuzzleTestResults([]);
  }, [PuzzleTestResults, setPuzzleProblem, setPuzzleRules, setPuzzleTests]);

  return (
    <PuzzlePageLayout>
      <PuzzleEditPane />
      <SolutionEditPane />
    </PuzzlePageLayout>
  );
};
