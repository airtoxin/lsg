import gql from "graphql-tag";

export const typeDefs = gql`
  scalar Date

  type Puzzle {
    id: ID!
    description: String!
    input: String!
    createdAt: Date!
    updatedAt: Date!
    rules: [PuzzleRule!]!
    tests: [PuzzleTest!]!
  }

  type PuzzleRule {
    from: String!
    to: String!
    fixed: Boolean!
  }

  type PuzzleTest {
    isAny: Boolean!
    step: Int!
    expect: String!
  }

  type Query {
    puzzle(id: ID!): Puzzle!
    puzzles: [Puzzle!]!
    newPuzzles: [Puzzle!]!
  }

  input AddPuzzle {
    description: String!
    input: String!
    rules: [AddPuzzleRule!]!
    tests: [AddPuzzleTest!]!
  }
  input AddPuzzleRule {
    from: String!
    to: String!
    fixed: Boolean!
  }
  input AddPuzzleTest {
    isAny: Boolean!
    step: Int!
    expect: String!
  }

  type Mutation {
    addNewPuzzle(puzzle: AddPuzzle!): Puzzle!
  }
`;
