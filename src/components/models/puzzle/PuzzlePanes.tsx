import { VoidFunctionComponent } from "react";
import { PuzzlePane } from "./PuzzlePane";
import { SolutionPane } from "../solution/SolutionPane";

export const PuzzlePanes: VoidFunctionComponent = () => {
  return (
    <div className="flex-grow flex flex-col sm:flex-row">
      <PuzzlePane />
      <SolutionPane />
    </div>
  );
};
