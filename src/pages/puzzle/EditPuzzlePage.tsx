import { useEffect, VoidFunctionComponent } from "react";
import { PuzzlePageLayout } from "./PuzzlePageLayout";
import { useSetRecoilState } from "recoil";
import { PuzzleState } from "../../states";
import shortUuid from "short-uuid";
import { PuzzleEditPane } from "./PuzzleEditPane";
import { SolutionEditPane } from "./SolutionEditPane";

export const EditPuzzlePage: VoidFunctionComponent = () => {
  const setPuzzle = useSetRecoilState(PuzzleState);
  useEffect(() => {
    setPuzzle({
      id: shortUuid.generate(),
      description: "",
      input: "",
      rules: [],
      tests: [],
    });
  }, [setPuzzle]);

  return (
    <PuzzlePageLayout>
      <PuzzleEditPane />
      <SolutionEditPane />
    </PuzzlePageLayout>
  );
};
