import { router, TRPCError } from "@trpc/server";
import { puzzles } from "../../../libs/core/puzzles";
import { z } from "zod";

export const puzzleRouter = router().query("Puzzle", {
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
});
