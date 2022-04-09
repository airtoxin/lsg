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

export const zip = <A, B>(as: readonly A[], bs: readonly B[]): [A, B][] => {
  if (as.length !== bs.length) throw new Error(`Expect same length`);
  return as.map((a, i) => [a, bs[i]!]);
};

export const zip3 = <A, B, C>(
  as: readonly A[],
  bs: readonly B[],
  cs: readonly C[]
): [A, B, C][] => {
  if (as.length !== bs.length || bs.length !== cs.length)
    throw new Error(`Expect same length`);
  return as.map((a, i) => [a, bs[i]!, cs[i]!]);
};
