import { Puzzle, puzzles } from "../../../core/puzzles";
import { Database, getDatabase } from "../firebase";

export class PuzzleRepository {
  private db: Database;
  constructor() {
    this.db = getDatabase();
  }

  async create(puzzle: Puzzle) {
    return this.db.ref(`/server/puzzles/${puzzle.id}`).set(puzzle);
  }

  async findById(id: string): Promise<Puzzle | undefined> {
    const mainPuzzle = puzzles.find((p) => p.id === id);
    if (mainPuzzle != null) return mainPuzzle;
    const data = await this.db.ref(`/server/puzzles/${id}`).get();
    const parsed = Puzzle.safeParse(data.toJSON());
    return parsed.success ? parsed.data : undefined;
  }
}
