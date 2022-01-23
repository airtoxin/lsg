import { QueryResolvers } from "./types.gen";
import { puzzles } from "../../core/puzzles";

export const Query: QueryResolvers = {
  puzzles: (parent, args, context) => {
    console.log("@parent,args,context", parent, args, context);
    return puzzles;
  },
  newPuzzles: (parent, args, context) => {
    console.log("@parent,args,context", parent, args, context);
    return [];
  },
};
