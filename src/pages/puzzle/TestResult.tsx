import { ChangeEvent, useCallback, VoidFunctionComponent } from "react";
import { Test } from "../../core/puzzles";
import { useTestSuccess } from "./hooks";
import { Input } from "../../components/Input";

export type Props = {
  test: Test;
  onChangeExpect?: (expect: string) => unknown;
};
export const TestResult: VoidFunctionComponent<Props> = ({
  test,
  onChangeExpect,
}) => {
  const testSuccess = useTestSuccess(test);
  const handleChangeExpect = useCallback(
    (event: ChangeEvent<HTMLInputElement>) =>
      onChangeExpect?.(event.target.value),
    [onChangeExpect]
  );

  return test.isAny ? (
    <div data-testid="TestResult-Any" className="text-gray-500">
      <div>Step&nbsp;{test.step}</div>
      <div>Any</div>
      <div>Result:&nbsp;{test.resultAnimationText}</div>
    </div>
  ) : (
    <div data-testid="TestResult">
      <div>Step&nbsp;{test.step}</div>
      {onChangeExpect ? (
        <div className="flex">
          <span className="break-normal">Expect:&nbsp;</span>
          <Input value={test.expect} onChange={handleChangeExpect} />
        </div>
      ) : (
        <div>Expect:&nbsp;{test.expect}</div>
      )}
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
