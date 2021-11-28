import { VoidFunctionComponent } from "react";
import { TestResult } from "./TestResult";
import { useRecoilValue } from "recoil";
import { PuzzleState } from "../../states";
import { Input } from "../../components/Input";
import { TextArea } from "../../components/TextArea";
import dedent from "ts-dedent";

export const PuzzleEditPane: VoidFunctionComponent = () => {
  const puzzle = useRecoilValue(PuzzleState);
  if (puzzle == null) return null;

  return (
    <>
      <div className="pb-4">
        <div className="flex text-gray-400 text-sm">
          <div>Description:&nbsp;</div>
          <TextArea
            className="leading-4 h-24 pt-2"
            value={dedent`
              f
              f
              f
              f
              f
            `}
          />
        </div>
      </div>
      <div className="pb-4">
        <div className="flex">
          <div>Input:&nbsp;</div>
          <Input />
        </div>
      </div>
      {puzzle.tests.map((test) => {
        return <TestResult key={test.step} test={test} />;
      })}
    </>
  );
};
