import { useMemo, VoidFunctionComponent } from "react";
import { Test } from "../../core/puzzles";

export const TestResult: VoidFunctionComponent<{ test: Test }> = ({ test }) => {
  const testSuccess = useMemo(
    () =>
      test.result == null ||
      test.resultAnimationText == null ||
      test.result !== test.resultAnimationText
        ? undefined
        : test.result === test.expect,
    [test.expect, test.result, test.resultAnimationText]
  );

  return (
    <div>
      <div>Step {test.step}</div>
      <div>Expect: {test.expect}</div>
      <div
        className={
          testSuccess == null
            ? ""
            : testSuccess
            ? "text-green-300"
            : "text-red-300"
        }
      >
        Result: {test.resultAnimationText ?? ""}
      </div>
    </div>
  );
};
