import { useEffect, useMemo, VoidFunctionComponent } from "react";
import { Test } from "../../core/puzzles";
import useSound from "use-sound";
import { Input } from "../../components/Input";

export const TestResultEdit: VoidFunctionComponent<{ test: Test }> = ({
  test,
}) => {
  const [playOk] = useSound("/assets/ok.wav", { interrupt: true });
  const [playNg] = useSound("/assets/ng.wav", { interrupt: true });

  const testSuccess = useMemo(
    () =>
      test.result == null ||
      test.resultAnimationText == null ||
      test.result !== test.resultAnimationText
        ? undefined
        : test.result === test.expect,
    [test.expect, test.result, test.resultAnimationText]
  );
  useEffect(() => {
    if (testSuccess == null) return;
    testSuccess ? playOk() : playNg();
  }, [playNg, playOk, testSuccess]);

  return (
    <div className="flex-grow">
      <div>Step&nbsp;{test.step}</div>
      <div className="flex">
        Expect:&nbsp;
        <Input />
      </div>
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
