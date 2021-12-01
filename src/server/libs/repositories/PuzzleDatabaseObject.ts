import { z } from "zod";
import { Puzzle } from "../../../core/puzzles";
import { objectToArray } from "../../../utils/array";

export type PuzzleDatabaseObject = z.infer<typeof PuzzleDatabaseObject>;
export const PuzzleDatabaseObject = z.object({
  id: z.string(),
  description: z.string(),
  rules: z.record(
    z.string(),
    z.object({
      from: z.string(),
      to: z.string(),
      fixed: z.boolean(),
    })
  ),
  input: z.string(),
  tests: z.record(
    z.string(),
    z.object({
      isAny: z.boolean(),
      step: z.number().int(),
      expect: z.string(),
      result: z.string().nullish(),
      resultAnimationText: z.string().nullish(),
    })
  ),
  createdAt: z.number(),
});

export const convertToPuzzle = (dbp: PuzzleDatabaseObject): Puzzle => ({
  id: dbp.id,
  description: dbp.description,
  input: dbp.input,
  rules: objectToArray(dbp.rules),
  tests: objectToArray(dbp.tests),
});
