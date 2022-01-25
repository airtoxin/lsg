import { QueryResolvers } from "./resolver-types.gen";
import { puzzles } from "../../core/puzzles";
import { GraphQLYogaError } from "@graphql-yoga/node";

export const Query: QueryResolvers = {
  puzzle: (parent, args) => {
    throw new GraphQLYogaError(`Puzzle not found, id:${args.id}`);
  },
  puzzles: () => {
    return puzzles;
  },
  newPuzzles: () => {
    return [];
  },
};
