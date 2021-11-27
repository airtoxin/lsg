import { VoidFunctionComponent } from "react";
import { Puzzle } from "../../../core/puzzles";
import { TestResult } from "../test/TestResult";

export const PuzzlePane: VoidFunctionComponent<{ puzzle: Puzzle }> = ({
  puzzle,
}) => {
  return (
    <div className="block p-4 m-0 w-full h-full overflow-y-scroll border border-gray-50">
      <div className="p-4">
        {puzzle.description.split("\n").map((desc) => (
          <div key={desc} className="text-gray-500 text-sm">
            {desc}
          </div>
        ))}
      </div>
      <div className="p-4">
        <div>Input: {puzzle.input}</div>
      </div>
      {puzzle.tests.map((test) => {
        return <TestResult key={test.step} test={test} />;
      })}
    </div>
  );
};
