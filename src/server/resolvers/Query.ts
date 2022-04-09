import { QueryResolvers } from "./resolver-types.gen";
import { puzzles } from "../../core/puzzles";

export const Query: QueryResolvers = {
  puzzle: (parent, args) => {
    const puzzle = puzzles.find((p) => p.id === args.id);
    console.log("@puzzle", puzzle);
    if (puzzle) return puzzle;
    throw new Error(`Puzzle not found`);
  },
  puzzles: () => {
    return puzzles;
  },
  newPuzzles: () => {
    return [];
  },
};
