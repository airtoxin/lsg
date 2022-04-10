import {
  ChangeEvent,
  useCallback,
  useMemo,
  VoidFunctionComponent,
} from "react";
import { useRecoilState } from "recoil";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
import { swap } from "../../utils/array";
import { PuzzleRule } from "../../types.gen";
import {
  PuzzleProblemState,
  PuzzleRulesState,
  PuzzleTestResultsState,
  PuzzleTestsState,
} from "../../states";
import { usePuzzleTestStatuses, useRunPuzzleTest } from "./hooks";
import { gql } from "@apollo/client";
import { useSolutionEditPaneMutation } from "./SolutionEditPane.gen";
import { pagesPath } from "../../utils/$path";
import { useRouter } from "next/router";

gql`
  mutation SolutionEditPane($puzzle: AddPuzzle!) {
    addNewPuzzle(puzzle: $puzzle) {
      id
    }
  }
`;

export const SolutionEditPane: VoidFunctionComponent = () => {
  const [puzzleProblem, setPuzzleProblem] = useRecoilState(PuzzleProblemState);
  const [puzzleRules, setPuzzleRules] = useRecoilState(PuzzleRulesState);
  const [puzzleTests, setPuzzleTests] = useRecoilState(PuzzleTestsState);
  const puzzleTestStatuses = usePuzzleTestStatuses();
  const [puzzleTestResults, setPuzzleTestResults] = useRecoilState(
    PuzzleTestResultsState
  );

  const setRule = useCallback(
    <K extends keyof PuzzleRule, T>(
        key: K,
        valueProcessor: (event: T, rule: PuzzleRule) => PuzzleRule[K]
      ) =>
      (index: number) =>
      (event: T) => {
        setPuzzleRules((puzzleRules) =>
          puzzleRules.map((puzzleRule, i) =>
            i !== index
              ? puzzleRule
              : {
                  ...puzzleRule,
                  [key]: valueProcessor(event, puzzleRule),
                }
          )
        );
        setPuzzleTestResults((puzzleTestResults) =>
          puzzleTestResults.map(() => null)
        );
      },
    [setPuzzleRules, setPuzzleTestResults]
  );
  const handleChangeFrom = setRule(
    "from",
    (event: ChangeEvent<HTMLInputElement>) => event.target.value.slice(0, 1)
  );
  const handleChangeTo = setRule(
    "to",
    (event: ChangeEvent<HTMLInputElement>) => event.target.value
  );
  const handleClickFixed = setRule("fixed", (_, rule) => !rule.fixed);

  const puzzleTestable = useMemo(
    () =>
      puzzleProblem &&
      puzzleProblem.input.length > 0 &&
      puzzleTests.length > 0 &&
      puzzleRules.length > 0 &&
      puzzleRules.every((puzzleRule) => puzzleRule.from.length > 0),
    [puzzleProblem, puzzleRules, puzzleTests.length]
  );
  const puzzlePublishable = useMemo(
    () =>
      puzzleTestable &&
      puzzleTestStatuses.every(
        (puzzleTestStatus) => puzzleTestStatus === "succeeded"
      ),
    [puzzleTestStatuses, puzzleTestable]
  );

  const runPuzzleTest = useRunPuzzleTest();

  const router = useRouter();
  const [publishPuzzle] = useSolutionEditPaneMutation();
  const handlePublish = useCallback(() => {
    if (puzzleProblem != null) {
      publishPuzzle({
        variables: {
          puzzle: {
            description: puzzleProblem.description,
            input: puzzleProblem.input,
            rules: puzzleRules,
            tests: puzzleTests,
          },
        },
      })
        .then((value) => {
          console.log("@value", value);
          if (value.data?.addNewPuzzle.id != null) {
            router.push(
              pagesPath.puzzle._id(value.data?.addNewPuzzle.id).$url()
            );
          }
        })
        .catch(console.error);
    }
  }, [publishPuzzle, puzzleProblem, puzzleRules, puzzleTests, router]);

  const handleClickAddRule = useCallback(() => {
    setPuzzleRules((puzzleRules) =>
      puzzleRules.concat([{ from: "", to: "", fixed: false }])
    );
    setPuzzleTestResults((puzzleTestResults) =>
      puzzleTestResults.map(() => null)
    );
  }, [setPuzzleRules, setPuzzleTestResults]);
  const handleClickDeleteRule = useCallback(
    (index: number) => () => {
      setPuzzleRules((puzzleRules) =>
        puzzleRules.filter((_, i) => i !== index)
      );
      setPuzzleTestResults((puzzleTestResults) =>
        puzzleTestResults.map(() => null)
      );
    },
    [setPuzzleRules, setPuzzleTestResults]
  );
  const handleClickReorder = useCallback(
    (index: number) => () => {
      setPuzzleRules((puzzleRules) =>
        index < 0 || puzzleRules.length - 2 < index
          ? puzzleRules
          : swap(puzzleRules, index)
      );
      setPuzzleTestResults((puzzleTestResults) =>
        puzzleTestResults.map(() => null)
      );
    },
    [setPuzzleRules, setPuzzleTestResults]
  );

  return (
    <>
      {puzzleRules.map((puzzleRule, i) => (
        <div key={i} className="pb-4 flex items-center">
          <div className="text-center">
            <Input
              className="w-12 text-center"
              value={puzzleRule.from}
              onChange={handleChangeFrom(i)}
            />
          </div>
          <div className="ml-4 mr-4">=&gt;</div>
          <Input
            noBorder={puzzleRule.fixed ?? undefined}
            type="text"
            value={puzzleRule.to}
            onChange={handleChangeTo(i)}
            disabled={puzzleRule.fixed ?? undefined}
            style={puzzleRule.fixed ? { pointerEvents: "none" } : {}}
          />
          <Button
            noBorder
            className="ml-2 pl-2 pr-2 text-gray-300"
            onClick={handleClickFixed(i)}
          >
            fixed
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
            onClick={handleClickDeleteRule(i)}
          >
            ✗
          </Button>
        </div>
      ))}
      <div className="flex flex-col pb-4">
        <Button onClick={handleClickAddRule}>Add rule +</Button>
      </div>
      <hr className="pb-4" />
      <div className="flex flex-col pb-4">
        <Button
          disabled={!puzzleTestable}
          onClick={() => puzzleTestable && runPuzzleTest()}
        >
          Run test
        </Button>
      </div>
      <div className="flex flex-col pb-4">
        <Button
          reverse
          disabled={!puzzlePublishable}
          onClick={() => puzzlePublishable && handlePublish()}
        >
          Publish puzzle
        </Button>
      </div>
    </>
  );
};
