import {
  ChangeEvent,
  useCallback,
  useEffect,
  VoidFunctionComponent,
} from "react";
import { pagesPath } from "../../utils/$path";
import { format } from "url";
import { useRouter } from "next/router";
import { useRecoilValue } from "recoil";
import { PuzzleState } from "../../states";
import useSound from "use-sound";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
import {
  usePuzzlePublishable,
  usePuzzleTestable,
  useRunTest,
  useSetPuzzleByKv,
} from "./hooks";
import { PuzzleRule } from "../../core/puzzles";
import { swap } from "../../utils/array";

export const SolutionEditPane: VoidFunctionComponent = () => {
  const puzzle = useRecoilValue(PuzzleState);
  const setPuzzleByKv = useSetPuzzleByKv();
  const setRule = useCallback(
    <K extends keyof PuzzleRule, T>(
        key: K,
        valueProcessor: (event: T, rule: PuzzleRule) => PuzzleRule[K]
      ) =>
      (index: number) =>
      (event: T) =>
        setPuzzleByKv("rules", (rules) =>
          rules.map((rule, i) =>
            i !== index
              ? rule
              : {
                  ...rule,
                  [key]: valueProcessor(event, rule),
                }
          )
        ),
    [setPuzzleByKv]
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

  const [play] = useSound("/assets/success.wav", { interrupt: true });
  const puzzlePublishable = usePuzzlePublishable();
  useEffect(() => {
    if (puzzlePublishable) setTimeout(play, 100);
  }, [play, puzzlePublishable]);

  const puzzleTestable = usePuzzleTestable();

  const runTest = useRunTest();

  const router = useRouter();
  const handleReturnToMenu = useCallback(() => {
    router.push(format(pagesPath.$url()));
  }, [router]);

  const handleClickAddRule = useCallback(
    () =>
      setPuzzleByKv("rules", (rules) =>
        [...rules].concat([{ from: "", to: "", fixed: false }])
      ),
    [setPuzzleByKv]
  );
  const handleClickDeleteRule = useCallback(
    (index: number) => () =>
      setPuzzleByKv("rules", (rules) => rules.filter((rule, i) => i !== index)),
    [setPuzzleByKv]
  );
  const handleClickReorder = useCallback(
    (index: number) => () =>
      setPuzzleByKv("rules", (rules) =>
        index < 0 || rules.length - 2 < index ? rules : swap(rules, index)
      ),
    [setPuzzleByKv]
  );

  return (
    <>
      {puzzle?.rules.map((rule, i) => (
        <div key={i} className="pb-4 flex items-center">
          <div className="text-center">
            <Input
              className="w-12 text-center"
              value={rule.from}
              onChange={handleChangeFrom(i)}
            />
          </div>
          <div className="ml-4 mr-4">=&gt;</div>
          <Input
            noBorder={rule.fixed}
            type="text"
            value={rule.to}
            onChange={handleChangeTo(i)}
            disabled={rule.fixed}
            style={rule.fixed ? { pointerEvents: "none" } : {}}
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
          onClick={() => (puzzlePublishable ? handleReturnToMenu() : runTest())}
        >
          {puzzlePublishable ? "Publish puzzle" : "Run test"}
        </Button>
      </div>
    </>
  );
};
