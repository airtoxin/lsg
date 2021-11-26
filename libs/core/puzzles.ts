import dedent from "ts-dedent";
import { Rule } from "./LSystem";

export type PuzzleRule = Rule & { fixed?: boolean };

export type Puzzle = {
  id: string;
  description: string;
  rules: PuzzleRule[];
  input: string;
  tests: Test[];
};

export type Test = {
  step: number;
  expect: string;
  result?: string;
  resultAnimationText?: string;
};

export const puzzles: Puzzle[] = [
  {
    id: "a1S5atzPu7pVy5EJVtSm7e",
    description: dedent`
      Replace all A to B
      Hint: A => B
    `,
    rules: [{ from: "A", to: "A" }],
    input: "AAAAA",
    tests: [{ step: 1, expect: "BBBBB" }],
  },
  {
    id: "aB8gbuPnKk4JtneGpDFnGz",
    description: dedent`
      Convert ABC to CBA
    `,
    rules: [
      { from: "A", to: "A" },
      { from: "B", to: "B" },
      { from: "C", to: "C" },
    ],
    input: "ABC",
    tests: [{ step: 1, expect: "CBA" }],
  },
  {
    id: "9s2wv9pfWbtgnydzy4WXW2",
    description: dedent`
      Delete all B
    `,
    rules: [
      { from: "A", to: "A" },
      { from: "B", to: "B" },
    ],
    input: "ABABAABBAABB",
    tests: [{ step: 1, expect: "AAAAAA" }],
  },
  {
    id: "1kcJ1yZ6KHqondtMEQFdYR",
    description: dedent`
      The step 2 gets the result of step 1 as its input
    `,
    rules: [
      { from: "A", to: "A" },
      { from: "B", to: "B" },
    ],
    input: "A",
    tests: [
      { step: 1, expect: "B" },
      { step: 2, expect: "BA" },
    ],
  },
  {
    id: "p1iA2k4eQGEN5ajUzskDBr",
    description: dedent`
      More steps
    `,
    rules: [
      { from: "A", to: "A" },
      { from: "B", to: "B" },
    ],
    input: "AB",
    tests: [
      { step: 1, expect: "ABBA" },
      { step: 2, expect: "ABBAAABB" },
      { step: 3, expect: "ABBAAABBABBABBAA" },
      { step: 4, expect: "ABBAAABBABBABBAAABBAAABBAAABBABB" },
    ],
  },
  {
    id: "j4oA98UXR6idDuuZ1LzRjq",
    description: dedent`
      Decreasing trend
    `,
    rules: [
      { from: "A", to: "A" },
      { from: "B", to: "B" },
      { from: "C", to: "C" },
    ],
    input: "AB",
    tests: [
      { step: 1, expect: "AC" },
      { step: 2, expect: "A" },
      { step: 3, expect: "" },
    ],
  },
  {
    id: "nAuVksGnXnsrMkLK6eHfFb",
    description: dedent`
      The rule B => AB was fixed
    `,
    rules: [
      { from: "A", to: "A" },
      { from: "B", to: "AB", fixed: true },
    ],
    input: "AB",
    tests: [
      { step: 1, expect: "AAAB" },
      { step: 2, expect: "AAAAAAAB" },
      { step: 3, expect: "AAAAAAAAAAAAAAAB" },
    ],
  },
  {
    id: "njgvsMF2MBaG3Gjt9DrNUP",
    description: dedent``,
    rules: [
      { from: "A", to: "A" },
      { from: "B", to: "", fixed: true },
      { from: "C", to: "C" },
    ],
    input: "AB",
    tests: [
      { step: 1, expect: "ACAB" },
      { step: 2, expect: "ACABACACAB" },
      { step: 3, expect: "ACABACACABACABACACABACACAB" },
    ],
  },
  {
    id: "jXRR7pcRY5R2JtmUpwgPF1",
    description: dedent`
      Don't change anything
    `,
    rules: [
      { from: "A", to: "", fixed: true },
      { from: "B", to: "", fixed: true },
      { from: "C", to: "C" },
    ],
    input: "ABC",
    tests: [
      { step: 1, expect: "ABC" },
      { step: 2, expect: "ABC" },
      { step: 3, expect: "ABC" },
    ],
  },
  {
    id: "bX19u8C655oErZtVPvTyUK",
    description: dedent`
      Hidden steps
    `,
    rules: [
      { from: "A", to: "A" },
      { from: "B", to: "B" },
      { from: "C", to: "A", fixed: true },
    ],
    input: "A",
    tests: [
      { step: 2, expect: "CCC" },
      { step: 5, expect: "CCCCCCCCC" },
    ],
  },
];
