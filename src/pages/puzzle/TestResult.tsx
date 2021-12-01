import { VoidFunctionComponent } from "react";
import { Test } from "../../core/puzzles";
import { useTestSuccess } from "./hooks";

export const TestResult: VoidFunctionComponent<{ test: Test }> = ({ test }) => {
  const testSuccess = useTestSuccess(test);

  return test.isAny ? (
    <div data-testid="TestResult-Any" className="text-gray-500">
      <div>Step&nbsp;{test.step}</div>
      <div>Any</div>
      <div>Result:&nbsp;{test.resultAnimationText}</div>
    </div>
  ) : (
    <div data-testid="TestResult">
      <div>Step&nbsp;{test.step}</div>
      <div>Expect:&nbsp;{test.expect}</div>
      <div
        className={
          testSuccess == null
            ? ""
            : testSuccess
            ? "text-green-300"
            : "text-red-300"
        }
      >
        Result:&nbsp;{test.resultAnimationText ?? ""}
      </div>
    </div>
  );
};
