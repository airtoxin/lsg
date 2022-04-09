import {
  ChangeEvent,
  useCallback,
  useEffect,
  VoidFunctionComponent,
} from "react";
import { Input } from "../../components/Input";
import { PuzzleTest, PuzzleTestResult } from "../../states2";
import { PuzzleTestStatus } from "./hooks2";
import useSound from "use-sound";

export const PuzzleTestAndResult: VoidFunctionComponent<{
  puzzleTest: PuzzleTest;
  puzzleTestResult: PuzzleTestResult;
  puzzleTestStatus: PuzzleTestStatus;
  onChangeExpect?: (expect: string) => void;
}> = ({ puzzleTest, puzzleTestResult, puzzleTestStatus, onChangeExpect }) => {
  const handleChangeExpect = useCallback(
    (event: ChangeEvent<HTMLInputElement>) =>
      onChangeExpect?.(event.target.value),
    [onChangeExpect]
  );

  const [playOk] = useSound("/assets/ok.wav", { interrupt: true });
  const [playNg] = useSound("/assets/ng.wav", { interrupt: true });
  useEffect(() => {
    if (puzzleTestStatus === "succeeded") playOk();
    if (puzzleTestStatus === "failed") playNg();
  }, [playNg, playOk, puzzleTestStatus]);

  return puzzleTest.isAny ? (
    <div data-testid="TestResult-Any" className="text-gray-500">
      <div>Step&nbsp;{puzzleTest.step}</div>
      <div>Any</div>
      <div>Result:&nbsp;{puzzleTestResult?.resultForAnimation}</div>
    </div>
  ) : (
    <div data-testid="TestResult">
      <div>Step&nbsp;{puzzleTest.step}</div>
      {onChangeExpect ? (
        <div className="flex">
          <span className="break-normal">Expect:&nbsp;</span>
          <Input value={puzzleTest.expect} onChange={handleChangeExpect} />
        </div>
      ) : (
        <div>Expect:&nbsp;{puzzleTest.expect}</div>
      )}
      <div
        className={
          {
            untested: "",
            testing: "",
            succeeded: "text-green-300",
            failed: "text-red-300",
          }[puzzleTestStatus]
        }
      >
        Result:&nbsp;{puzzleTestResult?.resultForAnimation ?? ""}
      </div>
    </div>
  );
};
