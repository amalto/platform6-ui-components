import { Component, ComponentInterface, Element, Event, EventEmitter, h, Host, JSX, Method, Prop, State } from '@stencil/core';
import { P6Control } from '../../../shared/form/control';
import { InvalidEventDetail, ValidEventDetail } from '../../../shared/form/event';
import { defaultCheckValidity, defaultValidationMessage } from '../../../shared/form/validation';
import { Mode } from '../../../shared/types';
import { getModeClass } from '../../../utils/classes';

export type P6SwitchValue = boolean | undefined;

@Component({
  tag: 'p6-switch',
  styleUrl: './p6-switch.scss',
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
  @Prop() mode: Mode = Mode.success;

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

  componentWillLoad(): void {
    this.host.addEventListener('focusout', this.checkValidity.bind(this));
  }

  render(): JSX.Element {
    const { name, checked, disabled } = this;

    const inputId = `${name}-input`;

    return (
      <Host>
        <input
          class={{
            switch: true,
            ...getModeClass(this.mode),
          }}
          ref={(input): void => {
            this.nativeInput = input;
          }}
          checked={checked}
          disabled={disabled}
          id={inputId}
          name={name}
          onClick={this.onClick}
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

  /**
   * Returns the error message that would be displayed if the user submits the form, or an empty string if no error message.
   * It also triggers the standard error message, such as "this is a required field".
   */
  @Method()
  async validationMessage(): Promise<string> {
    return defaultValidationMessage(this.nativeInput);
  }

  /**
   * Returns whether a form will validate when it is submitted, without having to submit it.
   */
  @Method()
  async checkValidity(): Promise<boolean> {
    return defaultCheckValidity<P6SwitchValue>({
      name: this.name,
      disabled: this.disabled,
      nativeInput: this.nativeInput,
      p6Valid: this.p6Valid,
      p6Invalid: this.p6Invalid,
      validationMessage: this.validationMessage.bind(this),
      errorHandler: hasError => {
        this.hasError = hasError;
      },
      getValue: () => this.checked,
    });
  }

  private onClick = (): void => {
    this.checked = !this.checked;
  };
}
