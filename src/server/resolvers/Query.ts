import { QueryResolvers } from "./resolver-types.gen";
import { puzzles } from "../../core/puzzles";

export const Query: QueryResolvers = {
  puzzle: (parent, args) => {
    throw new Error(`Puzzle not found, id:${args.id}`);
  },
  puzzles: () => {
    return puzzles;
  },
  newPuzzles: () => {
    return [];
  },
};
