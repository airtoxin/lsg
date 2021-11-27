import * as trpc from "@trpc/server";
import { puzzles } from "../../../libs/core/puzzles";

export const homeRouter = trpc.router().query("Home", {
  async resolve() {
    return {
      puzzleIds: puzzles.map((p) => p.id),
    };
  },
});
