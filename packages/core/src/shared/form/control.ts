import { EventEmitter } from '@stencil/core';
import { InvalidEventDetail, ValidEventDetail } from './event';
import { hasNativeValidation, hasValidation, P6ControlValidation } from './validation';

export interface P6NativeControl extends HTMLFormElement {
  name: string;
}

export interface P6Control<T> extends P6ControlValidation {
  name: string;
  readOnly?: boolean;
  disabled?: boolean;
  required?: boolean;

  p6FormRegister: EventEmitter<P6Control<T>>;
  p6FormUnregister: EventEmitter<P6Control<T>>;
  p6Valid: EventEmitter<ValidEventDetail<T>>;
  p6Invalid: EventEmitter<InvalidEventDetail>;

  reset?: () => Promise<boolean>;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/explicit-module-boundary-types
export function isP6Control<T>(elmt: any): elmt is P6Control<T> {
  return 'name' in elmt && hasValidation(elmt);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/explicit-module-boundary-types
export function isP6NativeControl(elmt: any): elmt is P6NativeControl {
  return 'name' in elmt && hasNativeValidation(elmt);
}
