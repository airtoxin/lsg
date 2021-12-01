/**
 * @jest-environment jsdom
 */
import { renderHook } from "@testing-library/react-hooks";
import { useTestSuccess } from "./hooks";
import { Test } from "../../core/puzzles";

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
