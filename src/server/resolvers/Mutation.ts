import { MutationResolvers } from "./resolver-types.gen";
import { generate } from "short-uuid";

export const Mutation: MutationResolvers = {
  addNewPuzzle: (parent, args) => {
    return {
      id: generate(),
      createdAt: new Date(),
      updatedAt: new Date(),
      ...args.puzzle,
    };
  },
};
