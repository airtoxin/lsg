import { ChangeEvent, useCallback, VoidFunctionComponent } from "react";
import { useRecoilState } from "recoil";
import { Input } from "../../components/Input";
import { TextArea } from "../../components/TextArea";
import { Button } from "../../components/Button";
import { swap, zip3 } from "../../utils/array";
import { PuzzleTestAndResult } from "./PuzzleTestAndResult";
import {
  PuzzleProblemState,
  PuzzleTestResultsState,
  PuzzleTestsState,
} from "../../states2";
import { usePuzzleTestStatuses } from "./hooks2";

export const PuzzleEditPane: VoidFunctionComponent = () => {
  const [puzzleProblem, setPuzzleProblem] = useRecoilState(PuzzleProblemState);
  const [puzzleTests, setPuzzleTests] = useRecoilState(PuzzleTestsState);
  const puzzleTestStatuses = usePuzzleTestStatuses();
  const [puzzleTestResults, setPuzzleTestResults] = useRecoilState(
    PuzzleTestResultsState
  );

  const handleChangeDescription = useCallback(
    (event: ChangeEvent<HTMLTextAreaElement>) =>
      setPuzzleProblem((puzzleProblem) => ({
        description: event.target.value,
        input: puzzleProblem?.input ?? "",
      })),
    [setPuzzleProblem]
  );
  const handleChangeInput = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setPuzzleProblem((puzzleProblem) => ({
        description: puzzleProblem?.description ?? "",
        input: event.target.value,
      }));
      setPuzzleTestResults((puzzleTestResults) =>
        puzzleTestResults.map(() => null)
      );
    },
    [setPuzzleProblem, setPuzzleTestResults]
  );
  const handleClickAddTestStep = useCallback(() => {
    setPuzzleTests((puzzleTests) =>
      [...puzzleTests]
        .concat([{ isAny: false, step: puzzleTests.length + 1, expect: "A" }])
        .sort((a, b) => (a.step === b.step ? 0 : a.step > b.step ? 1 : -1))
    );
    setPuzzleTestResults((puzzleTestResults) =>
      puzzleTestResults.map(() => null).concat([null])
    );
  }, [setPuzzleTestResults, setPuzzleTests]);

  const handleChangeExpect = useCallback(
    (step: number) => (expect: string) => {
      setPuzzleTests((puzzleTests) =>
        puzzleTests.map((puzzleTest) =>
          puzzleTest.step !== step
            ? puzzleTest
            : {
                ...puzzleTest,
                expect,
              }
        )
      );
      setPuzzleTestResults((puzzleTestResults) =>
        puzzleTestResults.map(() => null)
      );
    },
    [setPuzzleTestResults, setPuzzleTests]
  );
  const handleClickAny = useCallback(
    (step: number) => () => {
      setPuzzleTests((puzzleTests) =>
        puzzleTests.map((puzzleTest) =>
          puzzleTest.step !== step
            ? puzzleTest
            : {
                ...puzzleTest,
                isAny: !puzzleTest.isAny,
              }
        )
      );
      setPuzzleTestResults((puzzleTestResults) =>
        puzzleTestResults.map(() => null)
      );
    },
    [setPuzzleTestResults, setPuzzleTests]
  );
  const handleClickReorder = useCallback(
    (index: number) => () => {
      setPuzzleTests((puzzleTests) =>
        (index < 0 || puzzleTests.length - 2 < index
          ? puzzleTests
          : swap(puzzleTests, index)
        ).map((puzzleTest, i) => ({
          ...puzzleTest,
          step: i + 1,
        }))
      );
      setPuzzleTestResults((puzzleTestResults) =>
        puzzleTestResults.map(() => null)
      );
    },
    [setPuzzleTestResults, setPuzzleTests]
  );
  const handleClickDeleteTest = useCallback(
    (step: number) => () => {
      setPuzzleTests((puzzleTests) =>
        puzzleTests
          .filter((puzzleTest) => puzzleTest.step !== step)
          .map((puzzleTest, i) => ({
            ...puzzleTest,
            step: i + 1,
          }))
      );
      setPuzzleTestResults((puzzleTestResults) =>
        puzzleTestResults.slice(0, -1).map(() => null)
      );
    },
    [setPuzzleTestResults, setPuzzleTests]
  );

  if (puzzleProblem == null) return null;
  return (
    <>
      <div className="pb-4">
        <div className="flex text-gray-400 text-sm">
          <div className="leading-4 pt-2">Description:&nbsp;</div>
          <TextArea
            className="leading-4 h-24 pt-2"
            value={puzzleProblem.description}
            onChange={handleChangeDescription}
          />
        </div>
      </div>

      <div className="pb-4">
        <div className="flex">
          <div>Input:&nbsp;</div>
          <Input value={puzzleProblem.input} onChange={handleChangeInput} />
        </div>
      </div>

      <hr className="pb-4" />

      {zip3(puzzleTests, puzzleTestResults, puzzleTestStatuses).map(
        ([puzzleTest, puzzleTestResult, puzzleTestStatus], i) => {
          return (
            <div
              className="pb-4 flex flex-col lg:flex-row"
              key={puzzleTest.step}
            >
              <div className="flex-grow flex-shrink break-all">
                <PuzzleTestAndResult
                  key={puzzleTest.step}
                  puzzleTest={puzzleTest}
                  puzzleTestResult={puzzleTestResult}
                  puzzleTestStatus={puzzleTestStatus}
                  onChangeExpect={handleChangeExpect(puzzleTest.step)}
                />
              </div>
              <div className="flex flex-shrink-0 ml-auto">
                <Button
                  noBorder
                  className="ml-2 pl-2 pr-2 text-gray-300"
                  onClick={handleClickAny(puzzleTest.step)}
                >
                  any
                </Button>
                <Button
                  disabled={i === 0}
                  noBorder
                  className="ml-2 pl-2 pr-2 text-gray-300"
                  onClick={handleClickReorder(i - 1)}
                >
                  ↑
                </Button>
                <Button
                  disabled={i === puzzleTests.length - 1}
                  noBorder
                  className="ml-2 pl-2 pr-2 text-gray-300"
                  onClick={handleClickReorder(i)}
                >
                  ↓
                </Button>
                <Button
                  noBorder
                  className="ml-2 pl-2 pr-2 text-gray-300"
                  onClick={handleClickDeleteTest(puzzleTest.step)}
                >
                  ✗
                </Button>
              </div>
            </div>
          );
        }
      )}
      <div className="pb-4">
        <div className="flex flex-col">
          <Button onClick={handleClickAddTestStep}>Add test step +</Button>
        </div>
      </div>
    </>
  );
};
