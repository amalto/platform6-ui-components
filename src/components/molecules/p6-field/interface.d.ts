export interface InputChild extends HTMLElement {
  name: string;
  readOnly?: boolean;
  disabled: boolean;
  value: string;

  validationMessage: Readonly<string> | Producer<string>;
  checkValidity(): boolean | Promise<boolean>;
}

type Producer<T> = () => Promise<T>;
