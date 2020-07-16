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

export type P6SwitchValue = boolean | undefined;

@Component({
  tag: "p6-switch",
  styleUrl: "./p6-switch.scss",
  shadow: true,
})
export class P6Switch implements ComponentInterface, P6Control<P6SwitchValue> {
  @Element() host!: HTMLP6SwitchElement;

  /**
   * Initial value
   */
  @Prop() checked = false;

  /**
   * Disable
   */
  @Prop() disabled = false;

  /**
   * Mode
   */
  @Prop() color: Mode = Mode.success;

  /**
   * Size
   */
  @Prop() size: Size = Size.normal;

  /**
   * Switch name
   */
  @Prop() name!: string;

  /**
   * Registering the field in a p6-form
   */
  @Event() p6FormRegister!: EventEmitter<P6Control<P6SwitchValue>>;

  /**
   * Unregistering the field in a p6-form
   */
  @Event() p6FormUnregister!: EventEmitter<P6Control<P6SwitchValue>>;

  /**
   * Fires when the field has been checked for validity and satisfy its constraints
   */
  @Event() p6Valid!: EventEmitter<ValidEventDetail<P6SwitchValue>>;

  /**
   * Fires when the field has been checked for validity and doesn't satisfy its constraints
   */
  @Event() p6Invalid!: EventEmitter<InvalidEventDetail>;

  @State() hasError = false;

  private nativeInput: HTMLInputElement | undefined;

  // private defaultValue: boolean = this.checked;

  componentWillLoad(): void {
    // this.defaultValue = this.checked;
    this.host.addEventListener("focusout", this.checkValidity.bind(this));
  }

  render(): JSX.Element {
    const { name, checked, disabled } = this;

    const inputId = `${name}-input`;

    return (
      <Host onClick={this.onClick}>
        <input
          class={{
            switch: true,
            ...getSizeClass(this.size),
            ...getModeClass(this.color),
          }}
          ref={(input): void => {
            this.nativeInput = input;
          }}
          checked={checked}
          disabled={disabled}
          id={inputId}
          name={name}
          type="checkbox"
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

  /*
  @Watch("checked")
  onCheckedUpdated(newValue: boolean) {
    this.defaultValue = newValue;
  }
*/

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

  private onClick = (): void => {
    this.checked = !this.checked;
  };
}
