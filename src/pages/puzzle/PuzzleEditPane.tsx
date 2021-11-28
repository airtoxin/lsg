import { ChangeEvent, useCallback, VoidFunctionComponent } from "react";
import { useRecoilValue } from "recoil";
import { PuzzleState } from "../../states";
import { Input } from "../../components/Input";
import { TextArea } from "../../components/TextArea";
import { Button } from "../../components/Button";
import { useSetPuzzleByKv } from "./hooks";
import { TestResultEdit } from "./TestResultEdit";

export const PuzzleEditPane: VoidFunctionComponent = () => {
  const puzzle = useRecoilValue(PuzzleState);
  const setPuzzleByKv = useSetPuzzleByKv();

  const handleChangeDescription = useCallback(
    (event: ChangeEvent<HTMLTextAreaElement>) =>
      setPuzzleByKv("description", event.target.value),
    [setPuzzleByKv]
  );
  const handleChangeInput = useCallback(
    (event: ChangeEvent<HTMLInputElement>) =>
      setPuzzleByKv("input", event.target.value),
    [setPuzzleByKv]
  );
  const handleClickAddTestStep = useCallback(
    () =>
      setPuzzleByKv("tests", (tests) =>
        [...tests]
          .concat([{ step: tests.length + 1, expect: "A" }])
          .sort((a, b) => (a.step === b.step ? 0 : a.step > b.step ? 1 : -1))
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
            onChange={handleChangeDescription}
          />
        </div>
      </div>

      <div className="pb-4">
        <div className="flex">
          <div>Input:&nbsp;</div>
          <Input value={puzzle.input} onChange={handleChangeInput} />
        </div>
      </div>

      <hr className="pb-4" />

      {puzzle.tests.map((test) => {
        return (
          <div className="pb-4" key={test.step}>
            <TestResultEdit key={test.step} test={test} />
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
