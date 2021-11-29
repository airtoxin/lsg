import { z } from "zod";

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
});
