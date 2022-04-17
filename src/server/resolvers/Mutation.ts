import { MutationResolvers } from "./resolver-types.gen";
import { prisma } from "../libs/prisma";

export const Mutation: MutationResolvers = {
  addNewPuzzle: async (parent, { puzzle }) => {
    const { id } = await prisma.puzzle.create({
      select: {
        id: true,
      },
      data: {
        input: puzzle.input,
        description: puzzle.description,
        rules: {
          create: puzzle.rules.map((rule) => ({
            from: rule.from,
            to: rule.to,
            fixed: rule.fixed,
          })),
        },
        tests: {
          create: puzzle.tests.map((test) => ({
            isAny: test.isAny,
            step: test.step,
            expect: test.expect,
          })),
        },
      },
    });
    return id;
  },
};
