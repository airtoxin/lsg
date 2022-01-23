import dedent from "ts-dedent";
import { Puzzle } from "../types.gen";

export const puzzles: Puzzle[] = [
  {
    id: "a1S5atzPu7pVy5EJVtSm7e",
    description: dedent`
      Replace all A to B
      Hint: A => B
    `,
    rules: [{ from: "A", to: "A", fixed: false }],
    input: "AAAAA",
    tests: [{ isAny: false, step: 1, expect: "BBBBB" }],
    createdAt: new Date(0),
    updatedAt: new Date(0),
  },
  {
    id: "aB8gbuPnKk4JtneGpDFnGz",
    description: dedent`
      Convert ABC to CBA
    `,
    rules: [
      { from: "A", to: "A", fixed: false },
      { from: "B", to: "B", fixed: false },
      { from: "C", to: "C", fixed: false },
    ],
    input: "ABC",
    tests: [{ isAny: false, step: 1, expect: "CBA" }],
    createdAt: new Date(0),
    updatedAt: new Date(0),
  },
  {
    id: "9s2wv9pfWbtgnydzy4WXW2",
    description: dedent`
      Delete all B
    `,
    rules: [
      { from: "A", to: "A", fixed: false },
      { from: "B", to: "B", fixed: false },
    ],
    input: "ABABAABBAABB",
    tests: [{ isAny: false, step: 1, expect: "AAAAAA" }],
    createdAt: new Date(0),
    updatedAt: new Date(0),
  },
  {
    id: "1kcJ1yZ6KHqondtMEQFdYR",
    description: dedent`
      The step 2 gets the result of step 1 as its input
    `,
    rules: [
      { from: "A", to: "A", fixed: false },
      { from: "B", to: "B", fixed: false },
    ],
    input: "A",
    tests: [
      { isAny: false, step: 1, expect: "B" },
      { isAny: false, step: 2, expect: "BA" },
    ],
    createdAt: new Date(0),
    updatedAt: new Date(0),
  },
  {
    id: "p1iA2k4eQGEN5ajUzskDBr",
    description: dedent`
      More steps
    `,
    rules: [
      { from: "A", to: "A", fixed: false },
      { from: "B", to: "B", fixed: false },
    ],
    input: "AB",
    tests: [
      { isAny: false, step: 1, expect: "ABBA" },
      { isAny: false, step: 2, expect: "ABBAAABB" },
      { isAny: false, step: 3, expect: "ABBAAABBABBABBAA" },
      { isAny: false, step: 4, expect: "ABBAAABBABBABBAAABBAAABBAAABBABB" },
    ],
    createdAt: new Date(0),
    updatedAt: new Date(0),
  },
  {
    id: "j4oA98UXR6idDuuZ1LzRjq",
    description: dedent`
      Decreasing trend
    `,
    rules: [
      { from: "A", to: "A", fixed: false },
      { from: "B", to: "B", fixed: false },
      { from: "C", to: "C", fixed: false },
    ],
    input: "AB",
    tests: [
      { isAny: false, step: 1, expect: "AC" },
      { isAny: false, step: 2, expect: "A" },
      { isAny: false, step: 3, expect: "" },
    ],
    createdAt: new Date(0),
    updatedAt: new Date(0),
  },
  {
    id: "nAuVksGnXnsrMkLK6eHfFb",
    description: dedent`
      The rule B => AB was fixed
    `,
    rules: [
      { from: "A", to: "A", fixed: false },
      { from: "B", to: "AB", fixed: true },
    ],
    input: "AB",
    tests: [
      { isAny: false, step: 1, expect: "AAAB" },
      { isAny: false, step: 2, expect: "AAAAAAAB" },
      { isAny: false, step: 3, expect: "AAAAAAAAAAAAAAAB" },
    ],
    createdAt: new Date(0),
    updatedAt: new Date(0),
  },
  {
    id: "njgvsMF2MBaG3Gjt9DrNUP",
    description: dedent``,
    rules: [
      { from: "A", to: "A", fixed: false },
      { from: "B", to: "", fixed: true },
      { from: "C", to: "C", fixed: false },
    ],
    input: "AB",
    tests: [
      { isAny: false, step: 1, expect: "ACAB" },
      { isAny: false, step: 2, expect: "ACABACACAB" },
      { isAny: false, step: 3, expect: "ACABACACABACABACACABACACAB" },
    ],
    createdAt: new Date(0),
    updatedAt: new Date(0),
  },
  {
    id: "jXRR7pcRY5R2JtmUpwgPF1",
    description: dedent`
      Don't change anything
    `,
    rules: [
      { from: "A", to: "", fixed: true },
      { from: "B", to: "", fixed: true },
      { from: "C", to: "C", fixed: false },
    ],
    input: "ABC",
    tests: [
      { isAny: false, step: 1, expect: "ABC" },
      { isAny: false, step: 2, expect: "ABC" },
      { isAny: false, step: 3, expect: "ABC" },
    ],
    createdAt: new Date(0),
    updatedAt: new Date(0),
  },
  {
    id: "bX19u8C655oErZtVPvTyUK",
    description: dedent`
      Step of any
    `,
    rules: [
      { from: "A", to: "A", fixed: false },
      { from: "B", to: "B", fixed: false },
      { from: "C", to: "A", fixed: true },
    ],
    input: "A",
    tests: [
      { isAny: true, step: 1, expect: "" },
      { isAny: false, step: 2, expect: "CCC" },
      { isAny: true, step: 3, expect: "" },
      { isAny: true, step: 4, expect: "" },
      { isAny: false, step: 5, expect: "CCCCCCCCC" },
    ],
    createdAt: new Date(0),
    updatedAt: new Date(0),
  },
];
