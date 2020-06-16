import { InputChild } from "./interface";

export function isInputChild(elmt: Element): elmt is InputChild {
  return "name" in elmt && "checkValidity" in elmt;
}
