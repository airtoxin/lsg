import {
  ChangeEvent,
  useCallback,
  useEffect,
  useRef,
  VoidFunctionComponent,
} from "react";
import { lSystem } from "../../core/LSystem";
import { pagesPath } from "../../utils/$path";
import { format } from "url";
import { useRouter } from "next/router";
import { useRecoilState, useRecoilValue } from "recoil";
import { PuzzleState, PuzzleSuccessState } from "../../states";
import useSound from "use-sound";
import { Input } from "../../components/Input";

export const SolutionPane: VoidFunctionComponent = () => {
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
  const puzzleSuccess = useRecoilValue(PuzzleSuccessState);
  useEffect(() => {
    if (puzzleSuccess) setTimeout(play, 100);
  }, [play, puzzleSuccess]);

  const intervalRef = useRef(0);
  const handleRunTest = useCallback(() => {
    clearInterval(intervalRef.current);
    setPuzzle((puzzle) => {
      if (puzzle == null) return puzzle;
      return {
        ...puzzle,
        tests: puzzle.tests.map((test) => {
          const result = lSystem.exec(puzzle.input, puzzle.rules, test.step);
          return {
            ...test,
            result,
            resultAnimationText: result.slice(0, 1),
          };
        }),
      };
    });
    intervalRef.current = window.setInterval(() => {
      setPuzzle((puzzle) => {
        if (puzzle == null) return puzzle;
        if (
          puzzle.tests.every((test) => test.result === test.resultAnimationText)
        )
          clearInterval(intervalRef.current);
        return {
          ...puzzle,
          tests: puzzle.tests.map((test) => ({
            ...test,
            resultAnimationText: test.result?.slice(
              0,
              (test.resultAnimationText?.length ?? 0) + 1
            ),
          })),
        };
      });
    }, 100);
  }, [setPuzzle]);
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
      <hr className="pb-4" />
      <div className="flex flex-col pb-4">
        <button
          className="flex justify-center items-center border border-gray-50 font-bold rounded p-0.5 bg-gray-900 hover:bg-gray-700 active:bg-gray-500"
          onClick={() =>
            puzzleSuccess ? handleReturnToMenu() : handleRunTest()
          }
        >
          {puzzleSuccess ? "Back to menu" : "Run test"}
        </button>
      </div>
    </>
  );
};
