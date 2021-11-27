import * as trpc from "@trpc/server";
import * as trpcNext from "@trpc/server/adapters/next";
import { puzzles } from "../../../libs/core/puzzles";

const appRouter = trpc.router().query("mainPuzzles", {
  resolve() {
    return {
      puzzles,
    };
  },
});

// export type definition of API
export type AppRouter = typeof appRouter;

// export API handler
export default trpcNext.createNextApiHandler({
  router: appRouter,
  createContext: () => null,
});
