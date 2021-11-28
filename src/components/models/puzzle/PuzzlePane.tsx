import { VoidFunctionComponent } from "react";
import { TestResult } from "../test/TestResult";
import { useRecoilValue } from "recoil";
import { PuzzleState } from "../../../states";

export const PuzzlePane: VoidFunctionComponent = () => {
  const puzzle = useRecoilValue(PuzzleState);
  if (puzzle == null) return null;

  return (
    <div className="block p-4 m-0 w-full h-full overflow-y-scroll border border-gray-50">
      <div className="pb-4">
        {puzzle.description.split("\n").map((desc) => (
          <div key={desc} className="text-gray-500 text-sm">
            {desc}
          </div>
        ))}
      </div>
      <div className="pb-4">
        <div>Input: {puzzle.input}</div>
      </div>
      {puzzle.tests.map((test) => {
        return <TestResult key={test.step} test={test} />;
      })}
    </div>
  );
};
