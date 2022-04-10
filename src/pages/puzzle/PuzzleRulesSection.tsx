import {
  ChangeEvent,
  useCallback,
  useMemo,
  VoidFunctionComponent,
} from "react";
import { pagesPath } from "../../utils/$path";
import { format } from "url";
import { useRouter } from "next/router";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
import { useRecoilState } from "recoil";
import { PuzzleRulesState } from "../../states2";
import {
  usePuzzleTestStatuses,
  useRunPuzzleTest,
  useStopPuzzleTesting,
} from "./hooks2";

export const PuzzleRulesSection: VoidFunctionComponent = () => {
  const [puzzleRules, setPuzzleRules] = useRecoilState(PuzzleRulesState);
  const handleChangeRuleTo = useCallback(
    (index: number) => (event: ChangeEvent<HTMLInputElement>) => {
      const to = event.target.value;
      setPuzzleRules((puzzleRules) =>
        puzzleRules.map((puzzleRule, i) => {
          if (index !== i) return puzzleRule;
          return { ...puzzleRule, to };
        })
      );
    },
    [setPuzzleRules]
  );

  const puzzleTestStatuses = usePuzzleTestStatuses();
  const puzzleTesting = useMemo(
    () => puzzleTestStatuses.some((status) => status === "testing"),
    [puzzleTestStatuses]
  );
  const puzzleSuccess = useMemo(
    () => puzzleTestStatuses.every((status) => status === "succeeded"),
    [puzzleTestStatuses]
  );
  const stopPuzzleTesting = useStopPuzzleTesting();
  const runPuzzleTest = useRunPuzzleTest();

  const router = useRouter();
  const handleReturnToMenu = useCallback(() => {
    router.push(format(pagesPath.$url()));
  }, [router]);

  return (
    <>
      {puzzleRules.map((puzzleRule, i) => (
        <div key={i} className="pb-4 flex items-center">
          <div className="text-center">{puzzleRule.from}</div>
          <div className="ml-4 mr-4">=&gt;</div>
          <Input
            noBorder={puzzleRule.fixed ?? undefined}
            type="text"
            value={puzzleRule.to}
            onChange={handleChangeRuleTo(i)}
            disabled={puzzleRule.fixed ?? undefined}
            style={puzzleRule.fixed ? { pointerEvents: "none" } : {}}
          />
        </div>
      ))}
      <hr className="pb-4" />
      <div className="flex flex-col pb-4">
        <Button
          onClick={() =>
            puzzleTesting ? stopPuzzleTesting() : runPuzzleTest()
          }
        >
          {puzzleTesting ? "Stop test" : "Run test"}
        </Button>
      </div>
      <div className="flex flex-col pb-4">
        <Button
          reverse
          disabled={!puzzleSuccess}
          onClick={() => puzzleSuccess && handleReturnToMenu()}
        >
          DONE
        </Button>
      </div>
    </>
  );
};
