import { VoidFunctionComponent } from "react";
import { useRecoilValue } from "recoil";
import { PuzzleProblemState } from "../../states2";
import { PuzzleTestsSection } from "./PuzzleTestsSection";

export const PuzzleProblemSection: VoidFunctionComponent = () => {
  const puzzleProblem = useRecoilValue(PuzzleProblemState);
  if (puzzleProblem == null) return null;

  return (
    <>
      <div className="pb-4">
        {puzzleProblem.description.split("\n").map((desc) => (
          <div key={desc} className="text-gray-400 text-sm">
            {desc}
          </div>
        ))}
      </div>
      <div className="pb-4">
        <div>Input: {puzzleProblem.input}</div>
      </div>
      <PuzzleTestsSection />
    </>
  );
};
