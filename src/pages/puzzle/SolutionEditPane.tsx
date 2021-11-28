import {
  ChangeEvent,
  useCallback,
  useEffect,
  VoidFunctionComponent,
} from "react";
import { pagesPath } from "../../utils/$path";
import { format } from "url";
import { useRouter } from "next/router";
import { useRecoilState } from "recoil";
import { PuzzleState } from "../../states";
import useSound from "use-sound";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
import { usePuzzlePublishable, useRunTest } from "./hooks";

export const SolutionEditPane: VoidFunctionComponent = () => {
  const [puzzle, setPuzzle] = useRecoilState(PuzzleState);
  const handleChangeTo = useCallback(
    (index: number) => (event: ChangeEvent<HTMLInputElement>) => {
      const input = event.target.value;
      setPuzzle((puzzle) =>
        puzzle == null
          ? puzzle
          : {
              ...puzzle,
              rules: puzzle.rules.map((rule, i) =>
                i !== index ? rule : { ...rule, to: input }
              ),
            }
      );
    },
    [setPuzzle]
  );

  const [play] = useSound("/assets/success.wav", { interrupt: true });
  const puzzlePublishable = usePuzzlePublishable();
  useEffect(() => {
    if (puzzlePublishable) setTimeout(play, 100);
  }, [play, puzzlePublishable]);

  const runTest = useRunTest();

  const router = useRouter();
  const handleReturnToMenu = useCallback(() => {
    router.push(format(pagesPath.$url()));
  }, [router]);

  return (
    <>
      {puzzle?.rules.map((rule, i) => (
        <div key={i} className="pb-4 flex items-center">
          <div className="text-center">{rule.from}</div>
          <div className="ml-4 mr-4">=&gt;</div>
          <Input
            noBorder={rule.fixed}
            type="text"
            value={rule.to}
            onChange={handleChangeTo(i)}
            disabled={rule.fixed}
            style={rule.fixed ? { pointerEvents: "none" } : {}}
          />
        </div>
      ))}
      <div className="flex flex-col pb-4">
        <Button>Add rule +</Button>
      </div>
      <hr className="pb-4" />
      <div className="flex flex-col pb-4">
        <Button
          onClick={() => (puzzlePublishable ? handleReturnToMenu() : runTest())}
        >
          {puzzlePublishable ? "Publish puzzle" : "Run test"}
        </Button>
      </div>
    </>
  );
};
