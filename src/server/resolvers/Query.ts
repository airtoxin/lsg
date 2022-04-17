import { QueryResolvers } from "./resolver-types.gen";
import { puzzles } from "../../core/puzzles";
import { prisma } from "../libs/prisma";

export const Query: QueryResolvers = {
  puzzle: async (parent, args) => {
    const presetPuzzle = puzzles.find((p) => p.id === args.id);
    if (presetPuzzle) return presetPuzzle;
    const puzzle = await prisma.puzzle.findUnique({
      where: {
        id: args.id,
      },
      select: {
        id: true,
        input: true,
        description: true,
        rules: {
          select: {
            from: true,
            to: true,
            fixed: true,
          },
        },
        tests: {
          select: {
            isAny: true,
            step: true,
            expect: true,
          },
        },
        createdAt: true,
        updatedAt: true,
      },
    });
    if (puzzle == null) throw new Error(`Puzzle not found`);

    return puzzle;
  },
  puzzles: () => {
    return puzzles;
  },
  newPuzzles: () => {
    return prisma.puzzle.findMany({
      select: {
        id: true,
        input: true,
        description: true,
        rules: {
          select: {
            from: true,
            to: true,
            fixed: true,
          },
        },
        tests: {
          select: {
            isAny: true,
            step: true,
            expect: true,
          },
        },
        createdAt: true,
        updatedAt: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  },
};
