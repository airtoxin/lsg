import { router, TRPCError } from "@trpc/server";
import { Puzzle } from "../../../core/puzzles";
import { z } from "zod";
import { PuzzleRepository } from "../../libs/repositories/PuzzleRepository";
import { puzzleService } from "../../../core/PuzzleService";

export const puzzleRouter = router()
  .query("Puzzle", {
    input: z.object({
      id: z.string().refine((id) => !id.includes("/")),
    }),
    async resolve({ input: { id } }) {
      const puzzle = await new PuzzleRepository().findById(id);
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
      const sanitizedPuzzle = puzzleService.sanitize(puzzle);
      const result = await new PuzzleRepository().create(sanitizedPuzzle);
      console.log("@result", result);
      return puzzle;
    },
  });
