import {
  ChangeEvent,
  MouseEvent,
  useCallback,
  VoidFunctionComponent,
} from "react";
import { TestResult } from "./TestResult";
import { useRecoilValue } from "recoil";
import { PuzzleState } from "../../states";
import { Input } from "../../components/Input";
import { TextArea } from "../../components/TextArea";
import { Button } from "../../components/Button";
import { useSetPuzzleByKv } from "./hooks";

export const PuzzleEditPane: VoidFunctionComponent = () => {
  const puzzle = useRecoilValue(PuzzleState);
  const setPuzzleByKv = useSetPuzzleByKv();

  const handleChangeTextAreaValue = useCallback(
    (event: ChangeEvent<HTMLTextAreaElement>) =>
      setPuzzleByKv("description", event.target.value),
    [setPuzzleByKv]
  );
  const handleClickAddTestStep = useCallback(
    (event: MouseEvent<HTMLButtonElement>) =>
      setPuzzleByKv("tests", (tests) =>
        tests.concat([{ step: 1, expect: "A" }])
      ),
    [setPuzzleByKv]
  );

  if (puzzle == null) return null;
  return (
    <>
      <div className="pb-4">
        <div className="flex text-gray-400 text-sm">
          <div className="leading-4 pt-2">Description:&nbsp;</div>
          <TextArea
            className="leading-4 h-24 pt-2"
            value={puzzle.description}
            onChange={handleChangeTextAreaValue}
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
        return (
          <div className="pb-4" key={test.step}>
            <TestResult key={test.step} test={test} />
          </div>
        );
      })}
      <div className="pb-4">
        <div className="flex flex-col">
          <Button onClick={handleClickAddTestStep}>Add test step +</Button>
        </div>
      </div>
    </>
  );
};
