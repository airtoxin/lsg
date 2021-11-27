import { VoidFunctionComponent } from "react";
import { Puzzle } from "../../../core/puzzles";
import { PuzzlePane } from "./PuzzlePane";
import { SolutionPane } from "../solution/SolutionPane";

export type Props = {
  puzzle: Puzzle;
};
export const PuzzlePanes: VoidFunctionComponent<Props> = ({ puzzle }) => {
  return (
    <div className="flex-grow flex flex-col sm:flex-row">
      <PuzzlePane puzzle={puzzle} />
      <SolutionPane puzzle={puzzle} />
    </div>
  );
};
