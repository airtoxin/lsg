import { useEffect, VoidFunctionComponent } from "react";
import { PuzzlePageLayout } from "./PuzzlePageLayout";
import { SolutionPane } from "./SolutionPane";
import { useSetRecoilState } from "recoil";
import { PuzzleState } from "../../states";
import shortUuid from "short-uuid";
import { PuzzleEditPane } from "./PuzzleEditPane";

export const EditPuzzlePage: VoidFunctionComponent = () => {
  const setPuzzle = useSetRecoilState(PuzzleState);
  useEffect(() => {
    setPuzzle({
      id: shortUuid.generate(),
      description: "description here",
      input: "input",
      rules: [],
      tests: [],
    });
  }, [setPuzzle]);

  return (
    <PuzzlePageLayout>
      <PuzzleEditPane />
      <SolutionPane />
    </PuzzlePageLayout>
  );
};
