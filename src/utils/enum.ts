export type EnumArrayValue = number | string;
export type EnumArrayEntry = { key: string; value: EnumArrayValue };
export type EnumObject = { [key: string]: EnumArrayValue };

export const enumToArray = <E>(e: E): EnumArrayEntry[] => {
  return Object.entries(e)
    .filter((o) => Number.isNaN(Number(o[0])))
    .map((o) => ({ key: o[0], value: o[1] }));
};

export const enumArrayToObject = (arr: EnumArrayEntry[]): EnumObject => {
  return arr.reduce((acc, value) => {
    return { ...acc, [value.key]: value.value };
  }, {});
};
