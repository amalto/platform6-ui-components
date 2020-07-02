export function isFunction(elmt: unknown): elmt is CallableFunction {
  return typeof elmt === "function";
}
