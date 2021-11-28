import { swap } from "./array";

describe("swap", () => {
  it("should swap two elements", () => {
    expect(swap([1, 2, 3, 4, 5], 2)).toEqual([1, 2, 4, 3, 5]);
  });

  it("should immutable", () => {
    const input = [1, 2, 3, 4, 5];
    swap(input, 0);
    expect(input).toEqual([1, 2, 3, 4, 5]);
  });
});
