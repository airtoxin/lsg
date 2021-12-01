import { VoidFunctionComponent } from "react";
import { useRecoilValue } from "recoil";
import { PuzzleState } from "../../states";
import { TestResult } from "./TestResult";

export const PuzzlePane: VoidFunctionComponent = () => {
  const puzzle = useRecoilValue(PuzzleState);
  if (puzzle == null) return null;

  return (
    <>
      <div className="pb-4">
        {puzzle.description.split("\n").map((desc) => (
          <div key={desc} className="text-gray-400 text-sm">
            {desc}
          </div>
        ))}
      </div>
      <div className="pb-4">
        <div>Input: {puzzle.input}</div>
      </div>
      {puzzle.tests.map((test) => {
        return (
          <div key={test.step} className="pb-4 break-all">
            <TestResult key={test.step} test={test} />
          </div>
        );
      })}
    </>
  );
};
