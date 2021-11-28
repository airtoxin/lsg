import { router, TRPCError } from "@trpc/server";
import { Puzzle, puzzles } from "../../../core/puzzles";
import { z } from "zod";

export const puzzleRouter = router()
  .query("Puzzle", {
    input: z.object({
      id: z.string(),
    }),
    async resolve({ input: { id } }) {
      const puzzle = puzzles.find((p) => p.id === id);
      if (puzzle == null) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: `Puzzle not found '${id}'`,
        });
      }

      return {
        puzzle,
      };
    },
  })
  .mutation("AddPuzzle", {
    input: Puzzle,
    async resolve({ input: puzzle }) {
      console.log("@puzzle", puzzle);
      return puzzle;
    },
  });
