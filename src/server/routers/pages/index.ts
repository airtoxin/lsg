import { createRouter } from "../../createRouter";
import { homeRouter } from "./Home";
import { puzzleRouter } from "./Puzzle";

export const pageRouter = createRouter().merge(
  "page.",
  homeRouter.merge(puzzleRouter)
);
