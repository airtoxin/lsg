import { Puzzle, puzzles } from "../../../core/puzzles";
import { Database, getDatabase } from "../firebase";
import { PuzzleDatabaseObject } from "./PuzzleDatabaseObject";

export class PuzzleRepository {
  private db: Database;
  constructor() {
    this.db = getDatabase();
  }

  async create(puzzle: Puzzle) {
    await this.db.ref(`/server/puzzles/${puzzle.id}`).set(puzzle);
    return puzzle;
  }

  async findById(id: string): Promise<Puzzle | undefined> {
    const mainPuzzle = puzzles.find((p) => p.id === id);
    if (mainPuzzle != null) return mainPuzzle;

    const data = await this.db.ref(`/server/puzzles/${id}`).get();
    const parsed = PuzzleDatabaseObject.safeParse(data.toJSON());
    if (!parsed.success) return;

    const dbPuzzle = parsed.data;
    return {
      ...dbPuzzle,
      rules: objectToArray(dbPuzzle.rules),
      tests: objectToArray(dbPuzzle.tests),
    };
  }
}

const objectToArray = <T>(obj: Record<string, T>): T[] => {
  const entries = Object.entries(obj);
  entries.sort(([a], [b]) => (a === b ? 0 : a < b ? 1 : -1));
  return entries.map(([_, v]) => v);
};
