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

export const objectToArray = <T>(obj: Record<string, T>): T[] => {
  const entries = Object.entries(obj);
  entries.sort(([a], [b]) => (a === b ? 0 : a > b ? 1 : -1));
  return entries.map(([_, v]) => v);
};
