import { EnumArrayEntry, EnumArrayValue } from "~utils/enum";

export const enumArrayEntryToArray = (
  entries: EnumArrayEntry[]
): [string, EnumArrayValue][] => {
  return entries.map(({ key, value }) => [key, value]);
};
