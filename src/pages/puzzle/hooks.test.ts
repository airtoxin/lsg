/**
 * @jest-environment jsdom
 */
import { renderHook } from "@testing-library/react-hooks";
import { useTestSuccess } from "./hooks";
import { Test } from "../../core/puzzles";

test("useTestSuccess", () => {
  const test: Test = {
    isAny: false,
    step: 1,
    expect: "ABC",
  };
  const { result } = renderHook(() => useTestSuccess(test));

  expect(result.current).toBeUndefined();
});
