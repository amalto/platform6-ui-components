import { EventEmitter } from "@stencil/core";
import { InvalidEventDetail, ValidEventDetail } from "~shared/form/event";
import { isFunction } from "~utils/is-utils";

export interface P6ControlValidation {
  validationMessage: () => Promise<string>;
  checkValidity(): Promise<boolean>;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/explicit-module-boundary-types
export function hasValidation(elmt: any): elmt is P6ControlValidation {
  return (
    "validationMessage" in elmt &&
    "checkValidity" in elmt &&
    isFunction(elmt.checkValidity) &&
    isFunction(elmt.validationMessage)
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/explicit-module-boundary-types
export function hasNativeValidation(elmt: any): elmt is P6ControlValidation {
  return (
    "validationMessage" in elmt &&
    "checkValidity" in elmt &&
    isFunction(elmt.checkValidity) &&
    typeof elmt.validationMessage === "string"
  );
}

type NativeInput = HTMLTextAreaElement | HTMLInputElement | HTMLSelectElement;

export async function defaultValidationMessage(
  nativeInput?: NativeInput
): Promise<string> {
  return Promise.resolve(nativeInput?.validationMessage || "");
}

export async function defaultCheckValidity<T>({
  name,
  validationMessage,
  getValue,
  errorHandler,
  nativeInput,
  p6Valid,
  p6Invalid,
}: {
  name: string;
  getValue: () => T;
  p6Valid: EventEmitter<ValidEventDetail<T>>;
  p6Invalid: EventEmitter<InvalidEventDetail>;
  validationMessage: () => Promise<string>;
  errorHandler?: (hasError: boolean) => void;
  nativeInput?: NativeInput;
}): Promise<boolean> {
  const isValid = !!nativeInput?.checkValidity();

  const message = await validationMessage();
  const hasError = message !== "";
  errorHandler?.(hasError);

  if (hasError) {
    const invalidInit = {
      name,
      message,
    };
    p6Invalid.emit(invalidInit);
  } else {
    const validInit = {
      name,
      value: getValue(),
    };
    p6Valid.emit(validInit);
  }

  return Promise.resolve(isValid);
}
