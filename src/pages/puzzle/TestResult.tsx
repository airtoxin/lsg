import {
  ChangeEvent,
  useCallback,
  useState,
  VoidFunctionComponent,
} from "react";
import { useTestSuccess } from "./hooks";
import { Input } from "../../components/Input";
import gql from "graphql-tag";
import { TestResultFragment } from "./TestResult.gen";

gql`
  fragment TestResult on PuzzleTest {
    step
    isAny
    expect
  }
`;

export type Props = {
  test: TestResultFragment;
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
  const [resultAnimationText] = useState("");

  return test.isAny ? (
    <div data-testid="TestResult-Any" className="text-gray-500">
      <div>Step&nbsp;{test.step}</div>
      <div>Any</div>
      <div>Result:&nbsp;{resultAnimationText}</div>
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
        Result:&nbsp;{resultAnimationText ?? ""}
      </div>
    </div>
  );
};
