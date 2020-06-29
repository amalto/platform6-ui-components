export interface P6ControlValidation {
  validationMessage: () => Promise<string>;
  checkValidity(): Promise<boolean>;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/explicit-module-boundary-types
export function hasValidation(elmt: any): elmt is P6ControlValidation {
  return (
    "validationMessage" in elmt &&
    "checkValidity" in elmt &&
    typeof elmt.checkValidity === "function" &&
    typeof elmt.validationMessage === "function"
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/explicit-module-boundary-types
export function hasNativeValidation(elmt: any): elmt is P6ControlValidation {
  return (
    "validationMessage" in elmt &&
    "checkValidity" in elmt &&
    typeof elmt.checkValidity === "function" &&
    typeof elmt.validationMessage === "string"
  );
}
