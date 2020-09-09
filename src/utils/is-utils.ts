export function isFunction(elmt: unknown): elmt is CallableFunction {
  return typeof elmt === 'function';
}

export function isNumber(value: unknown): value is number {
  return typeof value === 'number';
}
