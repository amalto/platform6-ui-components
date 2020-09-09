export function partitionWith<T>(predicate: (item: T) => boolean): (data: T[]) => [T[], T[]] {
  return data =>
    data.reduce<[T[], T[]]>(
      (acc, cur) => {
        return predicate(cur) ? [acc[0].concat(cur), acc[1]] : [acc[0], acc[1].concat(cur)];
      },
      [[], []],
    );
}
