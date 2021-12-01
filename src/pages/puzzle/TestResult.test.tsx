/**
 * @jest-environment jsdom
 */
import "@testing-library/jest-dom";
import React from "react";
import { render } from "@testing-library/react";
import { TestResult } from "./TestResult";
import { Test } from "../../core/puzzles";

describe("TestResult", () => {
  const createDefaultContext = () => {
    const test: Test = {
      isAny: false,
      step: 1,
      expect: "ABC",
    };
    return { test };
  };

  it("isAny:false のとき Step, Expect, Result が表示されること", () => {
    const { test } = createDefaultContext();

    const { queryByTestId } = render(<TestResult test={test} />);

    const element = queryByTestId("TestResult");
    expect(element).toHaveTextContent("Step 1");
    expect(element).toHaveTextContent("Expect: ABC");
    expect(element).toHaveTextContent("Result:");
  });

  it("isAny:true のとき Step, Any, Result が表示されること", () => {
    const { test } = createDefaultContext();
    test.isAny = true;

    const { queryByTestId } = render(<TestResult test={test} />);

    const element = queryByTestId("TestResult-Any");
    expect(element).toHaveTextContent("Step 1");
    expect(element).not.toHaveTextContent("Expect: ABC");
    expect(element).toHaveTextContent("Any");
    expect(element).toHaveTextContent("Result:");
  });

  it("resultAnimationText が Result として表示されること", () => {
    const { test } = createDefaultContext();
    test.resultAnimationText = "ABCDE";

    const { queryByTestId } = render(<TestResult test={test} />);
    expect(queryByTestId("TestResult")).toHaveTextContent("Result: ABCDE");
  });
});
