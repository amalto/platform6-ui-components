import {
  Component,
  ComponentInterface,
  Element,
  Event,
  EventEmitter,
  h,
  Host,
  Method,
  Prop,
  State,
} from "@stencil/core";
import { P6Control } from "~shared/form/control";
import { InvalidEventDetail, ValidEventDetail } from "~shared/form/event";
import { cleanupValue, isEmpty } from "~utils/attribute";

export type P6InputType =
  | "email"
  | "number"
  | "password"
  | "search"
  | "tel"
  | "text"
  | "url";

export type P6InputValue = string | number | undefined;

@Component({
  tag: "p6-input",
  styleUrl: "p6-input.scss",
  shadow: true,
})
export class P6Input implements ComponentInterface, P6Control<P6InputValue> {
  @Element() host!: HTMLP6InputElement;

  /**
   * the input is not available for interaction. The value will not be submitted with the form
   */
  @Prop() disabled = false;

  /**
   * The maximum length or value
   */
  @Prop() max: number | undefined;

  /**
   * The minimum length or value
   */
  @Prop() min: number | undefined;

  /**
   * The name of the input.
   */
  @Prop() name!: string;

  /**
   * Pattern the value must match to be valid.
   */
  @Prop() pattern: string | undefined;

  /**
   * content to be appear in the form control when the form control is empty
   */
  @Prop() placeholder = "";

  /**
   * marks an element that can't be edited.
   */
  @Prop({ attribute: "readOnly" }) readOnly = false;

  /**
   * marks an element that can't be submitted without a value.
   */
  @Prop() required = false;

  /**
   * the content type of the input.
   */
  @Prop() type: P6InputType = "text";

  /**
   * the value of the input.
   */
  @Prop() value: string | number | undefined;

  /**
   * shows a waiting indicator
   */
  @Prop() waiting = false;

  @State() hasError = false;

  /**
   * Registering the field in a p6-form
   */
  @Event() p6FormRegister!: EventEmitter<P6Control<P6InputValue>>;

  /**
   * Unregistering the field in a p6-form
   */
  @Event() p6FormUnregister!: EventEmitter<P6Control<P6InputValue>>;

  /**
   * Fires when the field has been checked for validity and satisfy its constraints
   */
  @Event() p6Valid!: EventEmitter<ValidEventDetail<P6InputValue>>;

  /**
   * Fires when the field has been checked for validity and doesn't satisfy its constraints
   */
  @Event() p6Invalid!: EventEmitter<InvalidEventDetail>;

  private nativeInput: HTMLInputElement | undefined;

  componentWillLoad(): void {
    this.host.addEventListener("focusout", this.checkValidity.bind(this));
  }

  render(): JSX.Element {
    const containerClass = {
      control: true,
      "is-loading": !!this.waiting,
    };

    const classes = {
      input: true,
      "is-danger": this.hasError,
      "is-static": !!this.readOnly,
    };

    return (
      <Host>
        <div class={containerClass}>
          <input
            class={classes}
            ref={(input): void => {
              this.nativeInput = input;
            }}
            disabled={this.disabled}
            name={this.name}
            pattern={cleanupValue(this.pattern)}
            placeholder={cleanupValue(this.placeholder)}
            readOnly={this.readOnly}
            required={this.required}
            type={this.type}
            value={this.value}
            {...this.minMaxAttrs}
          />
        </div>
      </Host>
    );
  }

  componentDidLoad(): void {
    if (!isEmpty(this.value)) {
      this.checkValidity();
    }

    this.p6FormRegister.emit(this);
  }

  disconnectedCallback?(): void {
    this.p6FormUnregister.emit(this);
  }

  /**
   * Returns the error message that would be displayed if the user submits the form, or an empty string if no error message.
   * It also triggers the standard error message, such as "this is a required field".
   */
  @Method()
  async validationMessage(): Promise<string> {
    const message = this.nativeInput?.validationMessage || "";
    return Promise.resolve(message);
  }

  /**
   * Returns whether a form will validate when it is submitted, without having to submit it.
   */
  @Method()
  async checkValidity(): Promise<boolean> {
    const isValid = !!this.nativeInput?.checkValidity();

    const message = await this.validationMessage();
    this.hasError = message !== "";

    if (isValid) {
      const validInit = {
        name: this.name,
        value: this.inputValue,
      };
      this.p6Valid.emit(validInit);
    } else {
      const invalidInit = {
        name: this.name,
        message,
      };
      this.p6Invalid.emit(invalidInit);
    }

    return Promise.resolve(isValid);
  }

  private get minMaxAttrs():
    | { min?: number; max?: number }
    | { minLength?: number; maxLength?: number } {
    return this.type === "number"
      ? {
          min: this.min,
          max: this.max,
        }
      : {
          minLength: this.min,
          maxLength: this.max,
        };
  }

  private get inputValue(): string | number | undefined {
    if (this.nativeInput === undefined) {
      return undefined;
    }

    if (this.nativeInput.type === "number") {
      return this.nativeInput.valueAsNumber;
    }

    return this.nativeInput.value;
  }
}
