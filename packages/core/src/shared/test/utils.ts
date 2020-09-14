import { EnumArrayEntry } from '../../utils/enum';

export const enumArrayEntryToArray = <T>(entries: EnumArrayEntry<T>[]): [string, T[keyof T]][] => {
  return entries.map(({ key, value }) => [key, value]);
};
