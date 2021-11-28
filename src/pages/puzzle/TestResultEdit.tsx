import {
  ChangeEvent,
  useCallback,
  useEffect,
  VoidFunctionComponent,
} from "react";
import { Test } from "../../core/puzzles";
import useSound from "use-sound";
import { Input } from "../../components/Input";
import { useTestSuccess } from "./hooks";

export const TestResultEdit: VoidFunctionComponent<{
  test: Test;
  onChangeExpect: (expect: string) => unknown;
}> = ({ test, onChangeExpect }) => {
  const [playOk] = useSound("/assets/ok.wav", { interrupt: true });
  const [playNg] = useSound("/assets/ng.wav", { interrupt: true });

  const testSuccess = useTestSuccess(test);
  useEffect(() => {
    if (testSuccess == null) return;
    testSuccess ? playOk() : playNg();
  }, [playNg, playOk, testSuccess]);

  const handleChangeExpect = useCallback(
    (event: ChangeEvent<HTMLInputElement>) =>
      onChangeExpect(event.target.value),
    [onChangeExpect]
  );

  return (
    <div>
      <div>Step&nbsp;{test.step}</div>
      <div className="flex">
        <span className="break-normal">Expect:&nbsp;</span>
        <Input value={test.expect} onChange={handleChangeExpect} />
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
