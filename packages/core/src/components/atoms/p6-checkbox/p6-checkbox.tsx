import { Component, ComponentInterface, Element, Event, EventEmitter, h, Host, JSX, Method, Prop, State } from '@stencil/core';
import { P6Control } from '../../../shared/form/control';
import { InvalidEventDetail, ValidEventDetail } from '../../../shared/form/event';
import { defaultCheckValidity, defaultValidationMessage } from '../../../shared/form/validation';
import { Mode } from '../../../shared/types';
import { getModeClass } from '../../../utils/classes';

export type P6CheckboxValue = string | undefined;

@Component({
  tag: 'p6-checkbox',
  styleUrl: './p6-checkbox.scss',
  shadow: true,
})
export class P6Checkbox implements ComponentInterface, P6Control<P6CheckboxValue> {
  @Element() host!: HTMLP6CheckboxElement;

  /**
   * Checked
   */
  // eslint-disable-next-line @stencil/strict-mutable
  @Prop({ mutable: true, reflect: true }) checked = false;

  /**
   * Value
   */
  @Prop() value = 'on';

  /**
   * Disable
   */
  @Prop() disabled = false;

  /**
   * set the mode of the action
   */
  @Prop() mode: Mode = Mode.default;

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

  private defaultValue: boolean | undefined;

  componentWillLoad(): void {
    this.host.addEventListener('focusout', this.checkValidity.bind(this));

    if (this.defaultValue === undefined) {
      this.defaultValue = this.checked;
    }
  }

  render(): JSX.Element {
    const { name, disabled, value } = this;
    const inputId = `${name}-input`;
    const classes = {
      checkbox: true,
      ...getModeClass(this.mode),
    };

    return (
      <Host aria-disabled={disabled ? 'true' : null}>
        <input
          checked={this.checked}
          disabled={disabled}
          id={inputId}
          name={name}
          value={value}
          type="checkbox"
          class={classes}
          ref={(input): void => {
            this.nativeInput = input;
          }}
          onClick={this.updateState}
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
    return defaultCheckValidity<P6CheckboxValue>({
      name: this.name,
      disabled: this.disabled,
      nativeInput: this.nativeInput,
      p6Valid: this.p6Valid,
      p6Invalid: this.p6Invalid,
      validationMessage: this.validationMessage.bind(this),
      errorHandler: hasError => {
        this.hasError = hasError;
      },
      getValue: () => {
        return this.nativeInput?.checked ? this.nativeInput?.value : undefined;
      },
    });
  }

  /**
   * Restores the checkbox's default value
   */
  @Method()
  async reset(): Promise<boolean> {
    this.checked = !!this.defaultValue;
    return Promise.resolve(true);
  }

  private updateState = (): void => {
    this.checked = !this.checked;
  };
}
