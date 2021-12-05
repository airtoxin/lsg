/**
 * @jest-environment jsdom
 */

jest.mock("../utils/trpc");

import "whatwg-fetch";
import { render } from "@testing-library/react";
import React from "react";
import { HomePage } from "./HomePage";
import MyApp from "./_app.page";
import { trpc } from "../utils/trpc";

describe("HomePage", () => {
  const createDefaultContext = () => {
    // @ts-expect-error
    const Component = () => <MyApp Component={HomePage} />;
    const mockDefault = (
      returnValue: Partial<ReturnType<typeof trpc.useQuery>>
    ) => {
      trpc.useQuery = jest.fn().mockReturnValue(returnValue);
    };

    return { Component, mockDefault };
  };

  it("isLoading = true のときは loading 表示であること", () => {
    const { Component, mockDefault } = createDefaultContext();
    mockDefault({ isLoading: true });
    const { queryByText, debug } = render(<Component />);
    debug();
    expect(queryByText("Loading...")).not.toBeNull();
  });
});
