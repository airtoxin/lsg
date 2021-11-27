import {
  ChangeEvent,
  useCallback,
  useState,
  VoidFunctionComponent,
} from "react";
import { Puzzle } from "../../../core/puzzles";

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

  return (
    <div className="block p-4 m-0 w-full flex-shrink-0 sm:flex-shrink overflow-scroll border border-gray-50">
      {puzzle.rules.map((rule, i) => (
        <div key={i} className="p-4 pt-0 flex items-center">
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
    </div>
  );
};
