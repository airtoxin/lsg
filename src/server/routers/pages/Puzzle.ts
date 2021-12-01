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
        puzzle: puzzleService.sanitize(puzzle),
      };
    },
  })
  .mutation("AddPuzzle", {
    input: Puzzle,
    async resolve({ input: puzzle }): Promise<Puzzle> {
      const sanitizedPuzzle = puzzleService.sanitize(puzzle);
      return new PuzzleRepository().create(sanitizedPuzzle);
    },
  });
