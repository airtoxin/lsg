import { router } from "@trpc/server";
import { puzzles } from "../../../core/puzzles";

export const homeRouter = router().query("Home", {
  async resolve() {
    return {
      puzzleIds: puzzles.map((p) => p.id),
    };
  },
});
