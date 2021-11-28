export const swap = <T>(
  arr: readonly T[],
  indexA: number,
  indexB = indexA + 1
): T[] => {
  const copy = Array.from(arr);
  const tmp = copy[indexA];
  copy[indexA] = copy[indexB];
  copy[indexB] = tmp;
  return copy;
};
