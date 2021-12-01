import { router } from "@trpc/server";
import { puzzles } from "../../../core/puzzles";
import { PuzzleRepository } from "../../libs/repositories/PuzzleRepository";

export const homeRouter = router().query("Home", {
  async resolve() {
    return {
      puzzleIds: puzzles.map((p) => p.id),
      newPuzzles: (await new PuzzleRepository().list()).map((p) => p.id),
    };
  },
});
