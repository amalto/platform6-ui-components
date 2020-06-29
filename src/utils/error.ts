// Function returning never must have unreachable end point
export function throwError(message: string): never {
  throw new Error(message);
}
