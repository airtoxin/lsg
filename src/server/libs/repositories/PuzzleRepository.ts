import { Puzzle, puzzles } from "../../../core/puzzles";
import { Database, getDatabase } from "../firebase";
import { PuzzleDatabaseObject } from "./PuzzleDatabaseObject";
import { objectToArray } from "../../../utils/array";

export class PuzzleRepository {
  constructor(private db: Database = getDatabase()) {}

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
