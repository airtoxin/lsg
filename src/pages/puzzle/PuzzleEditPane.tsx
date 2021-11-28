import {
  ChangeEvent,
  useCallback,
  useState,
  VoidFunctionComponent,
} from "react";
import { useRecoilValue } from "recoil";
import { PuzzleState } from "../../states";
import { Input } from "../../components/Input";
import { TextArea } from "../../components/TextArea";
import { Button } from "../../components/Button";
import { useSetPuzzleByKv } from "./hooks";
import { TestResultEdit } from "./TestResultEdit";
import { swap } from "../../utils/array";

export const PuzzleEditPane: VoidFunctionComponent = () => {
  const puzzle = useRecoilValue(PuzzleState);
  const [anySteps, setAnySteps] = useState<number[]>([]);
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

  const handleClickAny = useCallback(
    (index: number) => () =>
      setAnySteps((steps) =>
        steps.indexOf(index) !== -1
          ? steps.filter((s) => s !== index)
          : steps.concat([index])
      ),
    []
  );
  const handleClickReorder = useCallback(
    (index: number) => () =>
      setPuzzleByKv("tests", (tests) =>
        index < 0 || tests.length - 2 < index ? tests : swap(tests, index)
      ),
    [setPuzzleByKv]
  );
  const handleClickDeleteTest = useCallback(
    (index: number) => () =>
      setPuzzleByKv("tests", (tests) => tests.filter((test, i) => i !== index)),
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

      {puzzle.tests.map((test, i) => {
        return (
          <div className="pb-4 flex items-center" key={test.step}>
            {anySteps.indexOf(i) !== -1 ? (
              <div className="flex-grow">
                <div>Step&nbsp;{test.step}</div>
                <div>Any</div>
                <div>&nbsp;</div>
              </div>
            ) : (
              <TestResultEdit key={test.step} test={test} />
            )}
            <div className="flex">
              <Button
                noBorder
                className="ml-2 pl-2 pr-2 text-gray-300"
                onClick={handleClickAny(i)}
              >
                any
              </Button>
              <Button
                noBorder
                className="ml-2 pl-2 pr-2 text-gray-300"
                onClick={handleClickReorder(i - 1)}
              >
                ↑
              </Button>
              <Button
                noBorder
                className="ml-2 pl-2 pr-2 text-gray-300"
                onClick={handleClickReorder(i)}
              >
                ↓
              </Button>
              <Button
                noBorder
                className="ml-2 pl-2 pr-2 text-gray-300"
                onClick={handleClickDeleteTest(i)}
              >
                ✗
              </Button>
            </div>
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
