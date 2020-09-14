export type EnumArrayEntry<T> = {
  key: string;
  value: T[keyof T];
};

export type EnumType = { [s: number]: string };

export type EnumObject<T> = { [key in keyof T]: T[keyof T] };

export const enumToArray = <E>(e: E): EnumArrayEntry<E>[] => {
  return Object.entries(e)
    .filter(o => Number.isNaN(Number(o[0])))
    .map(o => ({ key: o[0], value: o[1] }));
};

export const enumArrayToObject = <T>(arr: EnumArrayEntry<T>[]): EnumObject<T> => {
  return arr.reduce((acc, value) => {
    return { ...acc, [value.key]: value.value };
  }, {} as EnumObject<T>);
};
