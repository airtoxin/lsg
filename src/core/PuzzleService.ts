import { Puzzle } from "./puzzles";
import { generate } from "short-uuid";
import seedrandom from "seedrandom";
import dedent from "ts-dedent";
import { lSystem } from "./LSystem";

export class PuzzleService {
  randomize(seed?: string): Puzzle {
    const rng = seedrandom(seed);

    const inputPatterns = "ABCDEFGH".split("");
    const input = Array.from(Array(1 + Math.floor(rng() * 9)))
      .map(() => inputPatterns[Math.floor(rng() * 8)])
      .join("");
    const rulePatterns = inputPatterns.filter(
      (s) => input.indexOf(s) !== -1 || rng() < 0.5
    );
    const rules = rulePatterns
      .map((from) => ({
        fixed: rng() < 0.5,
        from,
        to: Array.from(Array(1 + Math.floor(rng() * 2)))
          .map(() => input[Math.floor(rng() * input.length - 1)])
          .join(""),
      }))
      .filter(
        (rule, _, rules) => !!rules.find((r) => r.to.includes(rule.from))
      );
    const tests = Array.from(Array(1 + Math.floor(rng() * 5))).map(
      (_, index) => ({
        step: index + 1,
        isAny: rng() < 0.2,
        expect: lSystem.exec(input, rules, index + 1),
      })
    );

    return {
      id: generate(),
      description: dedent`
        Random generated puzzle
        Seed: ${seed}
      `,
      input,
      rules,
      tests,
    };
  }

  sanitize(puzzle: Puzzle): Puzzle {
    return {
      id: generate(),
      description: puzzle.description,
      input: puzzle.input,
      rules: puzzle.rules.map((rule) => ({
        from: rule.from,
        to: rule.fixed ? rule.to : "",
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
