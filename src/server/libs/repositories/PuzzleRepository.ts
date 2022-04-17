import { puzzles } from "../../../core/puzzles";
import { convertToPuzzle, PuzzleDatabaseObject } from "./PuzzleDatabaseObject";
import { objectToArray } from "../../../utils/array";
import { z } from "zod";
import { prisma, prisma as p, PrismaClient } from "../prisma";
import { AddPuzzle, Puzzle } from "../../../types.gen";

export class PuzzleRepository {
  constructor(private prisma: PrismaClient = p) {}

  async create(puzzle: AddPuzzle): Promise<string> {
    const { id } = await this.prisma.puzzle.create({
      select: {
        id: true,
      },
      data: {
        input: puzzle.input,
        description: puzzle.description,
        rules: {
          create: puzzle.rules.map((rule) => ({
            from: rule.from,
            to: rule.to,
            fixed: rule.fixed,
          })),
        },
        tests: {
          create: puzzle.tests.map((test) => ({
            isAny: test.isAny,
            step: test.step,
            expect: test.expect,
          })),
        },
      },
    });
    return id;
  }

  async findById(id: string): Promise<Puzzle | undefined> {
    const presetPuzzle = puzzles.find((p) => p.id === args.id);
    if (presetPuzzle) return presetPuzzle;

    const puzzle = await prisma.puzzle.findUnique({
      where: {
        id: args.id,
      },
      select: {
        id: true,
        input: true,
        description: true,
        rules: {
          select: {
            from: true,
            to: true,
            fixed: true,
          },
        },
        tests: {
          select: {
            isAny: true,
            step: true,
            expect: true,
          },
        },
        createdAt: true,
        updatedAt: true,
      },
    });
    if (puzzle == null) throw new Error(`Puzzle not found`);

    return puzzle;
  }

  async list(): Promise<Puzzle[]> {
    const data = await this.db
      .ref(`/server/puzzles`)
      .orderByChild("createdAt")
      .limitToLast(10)
      .get();
    const parsed = z
      .record(z.string(), PuzzleDatabaseObject)
      .safeParse(data.toJSON());
    if (!parsed.success) return [];

    return Object.values(parsed.data)
      .sort((a, b) => (a.createdAt > b.createdAt ? -1 : 1))
      .map(convertToPuzzle);
  }
}
