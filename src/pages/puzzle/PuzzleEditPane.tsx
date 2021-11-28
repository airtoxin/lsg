import { ChangeEvent, useCallback, VoidFunctionComponent } from "react";
import { TestResult } from "./TestResult";
import { useRecoilState } from "recoil";
import { PuzzleState } from "../../states";
import { Input } from "../../components/Input";
import { TextArea } from "../../components/TextArea";
import { Puzzle } from "../../core/puzzles";
import { Button } from "../../components/Button";

export const PuzzleEditPane: VoidFunctionComponent = () => {
  const [puzzle, setPuzzle] = useRecoilState(PuzzleState);
  const setPuzzleByKv = useCallback(
    <K extends keyof Puzzle>(key: K, value: Puzzle[K]) => {
      setPuzzle((puzzle) =>
        puzzle == null
          ? puzzle
          : {
              ...puzzle,
              [key]: value,
            }
      );
    },
    [setPuzzle]
  );
  const handleChangeTextAreaValue = useCallback(
    (event: ChangeEvent<HTMLTextAreaElement>) =>
      setPuzzleByKv("description", event.target.value),
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
        return <TestResult key={test.step} test={test} />;
      })}
      <div className="pb-4">
        <div className="flex flex-col">
          <Button>Add test step +</Button>
        </div>
      </div>
    </>
  );
};
