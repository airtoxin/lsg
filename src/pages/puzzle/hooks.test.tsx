/**
 * @jest-environment jsdom
 */
import { act, renderHook } from "@testing-library/react-hooks";
import { useSetPuzzleByKv, useTestSuccess } from "./hooks";
import { Puzzle, Test } from "../../core/puzzles";
import { useRecoilState } from "recoil";
import { PuzzleState } from "../../states";
import { WrapperComponent } from "@testing-library/react-hooks/lib/types/react";

describe("useSetPuzzleByKv", () => {
  const createDefaultContext = () => {
    const puzzle: Puzzle = {
      id: "test",
      description: "test_description",
      rules: [],
      input: "ABC",
      tests: [],
    };
    const wrapper: WrapperComponent = ({children}) => ();
    return { puzzle };
  };

  it("指定した key フィールドに value を設定すること", () => {
    const { puzzle } = createDefaultContext();
    const {
      result: {
        current: [puzzleState, setPuzzleState],
      },
    } = renderHook(() => useRecoilState(PuzzleState), { wrapper });
    act(() => setPuzzleState(puzzle));
    expect(puzzleState).toEqual(puzzle);

    const {
      result: { current: setPuzzleByKv },
    } = renderHook(() => useSetPuzzleByKv());
    act(() => setPuzzleByKv("input", "CBA"));
    expect(puzzleState?.input).toBe("CBA");
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
