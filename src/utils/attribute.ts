export function isEmpty(value: unknown): boolean {
  return (
    value === undefined ||
    value === "undefined" ||
    value === null ||
    value === "null" ||
    `${value}`.trim() === ""
  );
}

export function convertAsDate(value: string | undefined): Date | undefined {
  if (value === undefined || value === "") {
    return undefined;
  }
  return new Date(value);
}

export function cleanupValue<T>(value: T | undefined | null): T | undefined {
  return isEmpty(value) ? undefined : (value as T);
}

export function cleanupAttributes(attributes: {
  [key: string]: unknown;
}): { [key: string]: unknown } {
  return Object.entries(attributes)
    .filter((attr) => !isEmpty(attr[1]))
    .reduce((acc, cur) => ({ ...acc, [cur[0]]: cur[1] }), {});
}
