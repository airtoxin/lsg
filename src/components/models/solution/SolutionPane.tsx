import {
  ChangeEvent,
  useCallback,
  useMemo,
  useState,
  VoidFunctionComponent,
} from "react";
import { Puzzle } from "../../../core/puzzles";
import { lSystem } from "../../../core/LSystem";
import { pagesPath } from "../../../utils/$path";
import { format } from "url";
import { useRouter } from "next/router";

export const SolutionPane: VoidFunctionComponent<{ puzzle: Puzzle }> = ({
  puzzle: p,
}) => {
  const [puzzle, setPuzzle] = useState(p);
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

  const puzzleSuccess = useMemo(() => {
    return puzzle == null
      ? undefined
      : puzzle.tests.every(
          (test) =>
            test.result != null &&
            test.resultAnimationText != null &&
            test.result === test.expect &&
            test.resultAnimationText === test.expect
        );
  }, [puzzle]);

  const handleRunTest = useCallback(() => {
    setPuzzle((puzzle) => {
      return puzzle == null
        ? puzzle
        : {
            ...puzzle,
            tests: puzzle.tests.map((test) => ({
              ...test,
              result: lSystem.exec(puzzle.input, puzzle.rules, test.step),
              resultAnimationText: "",
            })),
          };
    });
  }, [setPuzzle]);
  const router = useRouter();
  const handleReturnToMenu = useCallback(() => {
    router.push(format(pagesPath.$url()));
  }, [router]);

  return (
    <div className="block p-4 m-0 w-full flex-shrink-0 sm:flex-shrink overflow-scroll border border-gray-50">
      {puzzle.rules.map((rule, i) => (
        <div key={i} className="pb-4 flex items-center">
          <div className="text-center">{rule.from}</div>
          <div className="ml-4 mr-4">=&gt;</div>
          <input
            className={
              rule.fixed
                ? "bg-transparent pl-2 pr-2 w-full outline-none"
                : "bg-transparent border border-gray-50 rounded pl-2 pr-2 w-full outline-none"
            }
            type="text"
            value={rule.to}
            onChange={handleChangeTo(i)}
            disabled={rule.fixed}
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
    </div>
  );
};
