import { useEffect, VoidFunctionComponent } from "react";
import { PuzzleTestAndResult } from "./PuzzleTestAndResult";
import { useRecoilValue } from "recoil";
import { PuzzleTestResultsState, PuzzleTestsState } from "../../states2";
import { zip3 } from "../../utils/array";
import { usePuzzleTestStatuses } from "./hooks2";
import useSound from "use-sound";

export const PuzzleTestsSection: VoidFunctionComponent = () => {
  const puzzleTests = useRecoilValue(PuzzleTestsState);
  const puzzleTestResults = useRecoilValue(PuzzleTestResultsState);
  const puzzleTestStatuses = usePuzzleTestStatuses();

  const [play] = useSound("/assets/success.wav", { interrupt: true });
  useEffect(() => {
    if (puzzleTestStatuses.every((status) => status === "succeeded")) play();
  }, [play, puzzleTestStatuses]);

  return (
    <>
      {zip3(puzzleTests, puzzleTestResults, puzzleTestStatuses).map(
        ([puzzleTest, puzzleTestResult, puzzleTestStatus]) => {
          return (
            <div key={puzzleTest.step} className="pb-4 break-all">
              <PuzzleTestAndResult
                puzzleTest={puzzleTest}
                puzzleTestResult={puzzleTestResult}
                puzzleTestStatus={puzzleTestStatus}
              />
            </div>
          );
        }
      )}
    </>
  );
};
