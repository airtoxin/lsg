/**
 * @jest-environment jsdom
 */
import { act, cleanup, renderHook } from "@testing-library/react-hooks";
import { usePuzzleTestable, useSetPuzzleByKv, useTestSuccess } from "./hooks";
import { Puzzle, puzzles, Test } from "../../core/puzzles";
import { RecoilRoot, useRecoilState, useSetRecoilState } from "recoil";
import { PuzzleState } from "../../states";
import { WrapperComponent } from "@testing-library/react-hooks/lib/types/react";
import dedent from "ts-dedent";

afterEach(cleanup);

describe("useSetPuzzleByKv", () => {
  const createDefaultContext = () => {
    const puzzle: Puzzle = {
      id: "test",
      description: "test_description",
      rules: [],
      input: "ABC",
      tests: [],
    };
    const wrapper: WrapperComponent<{}> = ({ children }) => (
      <RecoilRoot>{children}</RecoilRoot>
    );
    return { puzzle, wrapper };
  };

  it("指定した key フィールドに value を設定すること", async () => {
    const { puzzle, wrapper } = createDefaultContext();
    const { result } = renderHook(
      () => {
        const [puzzleState, setPuzzleState] = useRecoilState(PuzzleState);
        const setPuzzleByKv = useSetPuzzleByKv();
        return {
          puzzleState,
          setPuzzleState,
          setPuzzleByKv,
        };
      },
      {
        wrapper,
      }
    );
    expect(result.current.puzzleState).toBeUndefined();
    act(() => result.current.setPuzzleState(puzzle));
    expect(result.current.puzzleState).toEqual(puzzle);

    act(() => result.current.setPuzzleByKv("input", "CBA"));
    expect(result.current.puzzleState?.input).toBe("CBA");
  });

  it("配列フィールドは配列すべてを入れ替えること", async () => {
    const { puzzle, wrapper } = createDefaultContext();
    const { result } = renderHook(
      () => {
        const [puzzleState, setPuzzleState] = useRecoilState(PuzzleState);
        const setPuzzleByKv = useSetPuzzleByKv();
        return {
          puzzleState,
          setPuzzleState,
          setPuzzleByKv,
        };
      },
      {
        wrapper,
      }
    );
    expect(result.current.puzzleState).toBeUndefined();
    act(() => result.current.setPuzzleState(puzzle));
    expect(result.current.puzzleState).toEqual(puzzle);

    act(() =>
      result.current.setPuzzleByKv("tests", [
        { isAny: false, step: 1, expect: "CBA" },
      ])
    );
    expect(result.current.puzzleState?.tests).toEqual([
      { isAny: false, step: 1, expect: "CBA" },
    ]);
  });
});

describe("usePuzzleTestable", () => {
  const createDefaultContext = () => {
    const puzzle: Puzzle = {
      id: "a1S5atzPu7pVy5EJVtSm7e",
      description: dedent`
        Replace all A to B
        Hint: A => B
      `,
      rules: [{ from: "A", to: "A" }],
      input: "AAAAA",
      tests: [{ isAny: false, step: 1, expect: "BBBBB" }],
    };
    const wrapper: WrapperComponent<{}> = ({ children }) => (
      <RecoilRoot>{children}</RecoilRoot>
    );

    return { puzzle, wrapper };
  };

  it("テスト可能な状態のときに true を返すこと", () => {
    const { puzzle, wrapper } = createDefaultContext();
    const { result } = renderHook(
      () => {
        const isTestable = usePuzzleTestable();
        const setPuzzle = useSetRecoilState(PuzzleState);
        return {
          isTestable,
          setPuzzle,
        };
      },
      { wrapper }
    );
    act(() => result.current.setPuzzle(puzzle));

    expect(result.current.isTestable).toBe(true);
  });

  it("input がない場合は false を返すこと", () => {
    const { puzzle, wrapper } = createDefaultContext();
    const { result } = renderHook(
      () => {
        const isTestable = usePuzzleTestable();
        const setPuzzle = useSetRecoilState(PuzzleState);
        return {
          isTestable,
          setPuzzle,
        };
      },
      { wrapper }
    );
    puzzle.input = "";
    act(() => result.current.setPuzzle(puzzle));

    expect(result.current.isTestable).toBe(false);
  });

  it("tests がない場合は false を返すこと", () => {
    const { puzzle, wrapper } = createDefaultContext();
    const { result } = renderHook(
      () => {
        const isTestable = usePuzzleTestable();
        const setPuzzle = useSetRecoilState(PuzzleState);
        return {
          isTestable,
          setPuzzle,
        };
      },
      { wrapper }
    );
    puzzle.tests = [];
    act(() => result.current.setPuzzle(puzzle));

    expect(result.current.isTestable).toBe(false);
  });

  it("rules がない場合は false を返すこと", () => {
    const { puzzle, wrapper } = createDefaultContext();
    const { result } = renderHook(
      () => {
        const isTestable = usePuzzleTestable();
        const setPuzzle = useSetRecoilState(PuzzleState);
        return {
          isTestable,
          setPuzzle,
        };
      },
      { wrapper }
    );
    puzzle.rules = [];
    act(() => result.current.setPuzzle(puzzle));

    expect(result.current.isTestable).toBe(false);
  });

  it("rule の from がない場合は false を返すこと", () => {
    const { puzzle, wrapper } = createDefaultContext();
    const { result } = renderHook(
      () => {
        const isTestable = usePuzzleTestable();
        const setPuzzle = useSetRecoilState(PuzzleState);
        return {
          isTestable,
          setPuzzle,
        };
      },
      { wrapper }
    );
    puzzle.rules = puzzle.rules.map((rule) => ({ ...rule, from: "" }));
    act(() => result.current.setPuzzle(puzzle));

    expect(result.current.isTestable).toBe(false);
  });
});

describe("usePuzzlePublishable", () => {
  const createDefaultContext = () => {
    const puzzle: Puzzle = {
      id: "a1S5atzPu7pVy5EJVtSm7e",
      description: dedent`
        Replace all A to B
        Hint: A => B
      `,
      rules: [{ from: "A", to: "A" }],
      input: "AAAAA",
      tests: [{ isAny: false, step: 1, expect: "BBBBB" }],
    };
    const wrapper: WrapperComponent<{}> = ({ children }) => (
      <RecoilRoot>{children}</RecoilRoot>
    );

    return { puzzle, wrapper };
  };

  it("テスト可能な状態のときに true を返すこと", () => {
    const { puzzle, wrapper } = createDefaultContext();
    const { result } = renderHook(
      () => {
        const isTestable = usePuzzleTestable();
        const setPuzzle = useSetRecoilState(PuzzleState);
        return {
          isTestable,
          setPuzzle,
        };
      },
      { wrapper }
    );
    act(() => result.current.setPuzzle(puzzle));

    expect(result.current.isTestable).toBe(true);
  });
});

describe("useTestSuccess", () => {
  const createDefaultContext = () => {
    const test: Test = {
      isAny: false,
      step: 1,
      expect: "ABC",
    };
    return { test };
  };

  it("テストが実行完了していない場合は undefined を返すこと", () => {
    {
      const { test } = createDefaultContext();
      const { result } = renderHook(() => useTestSuccess(test));
      expect(result.current).toBeUndefined();
    }
    {
      const { test } = createDefaultContext();
      test.result = "ABCDEFG";
      const { result } = renderHook(() => useTestSuccess(test));
      expect(result.current).toBeUndefined();
    }
    {
      const { test } = createDefaultContext();
      test.result = "ABCDEFG";
      test.resultAnimationText = "ABCDE";
      const { result } = renderHook(() => useTestSuccess(test));
      expect(result.current).toBeUndefined();
    }
    {
      const { test } = createDefaultContext();
      test.resultAnimationText = "ABCDE";
      const { result } = renderHook(() => useTestSuccess(test));
      expect(result.current).toBeUndefined();
    }
  });

  it("テストが実行完了していて、結果が正しい場合は true を返すこと", () => {
    const { test } = createDefaultContext();
    test.result = test.expect;
    test.resultAnimationText = test.expect;
    const { result } = renderHook(() => useTestSuccess(test));
    expect(result.current).toBe(true);
  });

  it("テストが実行完了していて、結果が間違っている場合は false を返すこと", () => {
    const { test } = createDefaultContext();
    test.result = "ABCDE";
    test.resultAnimationText = "ABCDE";
    const { result } = renderHook(() => useTestSuccess(test));
    expect(result.current).toBe(false);
  });
});
