import { InputChild } from "./interface";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isInputChild(elmt: Element): elmt is InputChild {
  return "name" in elmt && "checkValidity" in elmt;
}
