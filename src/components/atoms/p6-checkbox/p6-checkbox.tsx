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
import { Mode, Size } from "~shared/types";
import { getModeClass, getSizeClass } from "~utils/classes";

export type P6CheckboxValue = boolean | undefined;

@Component({
  tag: "p6-checkbox",
  styleUrl: "./p6-checkbox.scss",
  shadow: true,
})
export class P6Checkbox
  implements ComponentInterface, P6Control<P6CheckboxValue> {
  @Element() host!: HTMLP6CheckboxElement;

  /**
   * Initial value
   */
  @Prop() checked = false;

  /**
   * Disable
   */
  @Prop() disabled = false;

  /**
   * set the mode of the action
   */
  @Prop() mode: Mode = Mode.default;

  /**
   * set the size of the action
   */
  @Prop() size: Size = Size.normal;

  /**
   * Checkbox name
   */
  @Prop() name!: string;

  /**
   * Registering the field in a p6-form
   */
  @Event() p6FormRegister!: EventEmitter<P6Control<P6CheckboxValue>>;

  /**
   * Unregistering the field in a p6-form
   */
  @Event() p6FormUnregister!: EventEmitter<P6Control<P6CheckboxValue>>;

  /**
   * Fires when the field has been checked for validity and satisfy its constraints
   */
  @Event() p6Valid!: EventEmitter<ValidEventDetail<P6CheckboxValue>>;

  /**
   * Fires when the field has been checked for validity and doesn't satisfy its constraints
   */
  @Event() p6Invalid!: EventEmitter<InvalidEventDetail>;

  @State() hasError = false;

  private nativeInput: HTMLInputElement | undefined;

  componentWillLoad(): void {
    this.host.addEventListener("focusout", this.checkValidity.bind(this));
  }

  render(): JSX.Element {
    const { name, checked, disabled } = this;
    const inputId = `${name}-input`;
    const classes = {
      checkbox: true,
      ...getModeClass(this.mode),
      ...getSizeClass(this.size),
    };

    return (
      <Host aria-disabled={disabled ? "true" : null}>
        <input
          checked={checked}
          disabled={disabled}
          id={inputId}
          name={name}
          type="checkbox"
          class={classes}
          ref={(input): void => {
            this.nativeInput = input;
          }}
        />
        <label htmlFor={inputId}>
          <slot />
        </label>
      </Host>
    );
  }

  componentDidLoad(): void {
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
        value: this.checked,
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
}
