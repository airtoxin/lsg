import { atom } from "recoil";
import { Puzzle, PuzzleRule as PR, PuzzleTest as PT } from "./types.gen";

export type PuzzleProblem = Pick<Puzzle, "description" | "input">;
export const PuzzleProblemState = atom<PuzzleProblem | null>({
  key: "PuzzleProblemState",
  default: null,
});

export type PuzzleRule = Pick<PR, "fixed" | "from" | "to">;
export const PuzzleRulesState = atom<PuzzleRule[]>({
  key: "PuzzleRulesState",
  default: [],
});

export type PuzzleTest = Pick<PT, "step" | "isAny" | "expect">;
export const PuzzleTestsState = atom<PuzzleTest[]>({
  key: "PuzzleTestsState",
  default: [],
});

export type PuzzleTestResult = {
  result: string;
  resultForAnimation: string;
} | null;
export const PuzzleTestResultsState = atom<PuzzleTestResult[]>({
  key: "PuzzleTestResultsState",
  default: [],
});
