import { Puzzle } from "./puzzles";
import { generate } from "short-uuid";

export class PuzzleService {
  sanitize(puzzle: Puzzle): Puzzle {
    return {
      id: generate(),
      description: puzzle.description,
      input: puzzle.input,
      rules: puzzle.rules.map((rule) => ({
        ...rule,
        fixed: rule.fixed || false,
      })),
      tests: puzzle.tests.map(({ isAny, step, expect }) => ({
        isAny,
        step,
        expect,
      })),
    };
  }
}

export const puzzleService = new PuzzleService();
