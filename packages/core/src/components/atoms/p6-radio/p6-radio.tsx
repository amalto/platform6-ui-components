import { Component, ComponentInterface, Element, Event, EventEmitter, h, Host, JSX, Method, Prop } from '@stencil/core';
import { P6Control } from '../../../shared/form/control';
import { InvalidEventDetail, ValidEventDetail } from '../../../shared/form/event';
import { defaultCheckValidity, defaultValidationMessage } from '../../../shared/form/validation';

export type P6RadioValue = string | number | undefined;

@Component({
  tag: 'p6-radio',
  styleUrl: './p6-radio.scss',
  shadow: true,
})
export class P6Radio implements ComponentInterface, P6Control<P6RadioValue> {
  @Element() host!: HTMLP6RadioElement;

  /**
   * Radio name
   */
  @Prop({ reflect: true }) name!: string;

  /**
   * Value
   */
  @Prop() value!: string | number;

  /**
   * Initial value
   */
  // eslint-disable-next-line @stencil/strict-mutable
  @Prop({ mutable: true, reflect: true }) checked = false;

  /**
   * Disable
   */
  @Prop() disabled = false;

  /**
   * Readonly
   */
  @Prop({ attribute: 'readOnly' }) readOnly = false;

  /**
   * Registering the field in a p6-form
   */
  @Event() p6FormRegister!: EventEmitter<P6Control<P6RadioValue>>;

  /**
   * Unregistering the field in a p6-form
   */
  @Event() p6FormUnregister!: EventEmitter<P6Control<P6RadioValue>>;

  /**
   * Fires when the field has been checked for validity and satisfy its constraints
   */
  @Event() p6Valid!: EventEmitter<ValidEventDetail<P6RadioValue>>;

  /**
   * Fires when the field has been checked for validity and doesn't satisfy its constraints
   */
  @Event() p6Invalid!: EventEmitter<InvalidEventDetail>;

  private nativeInput: HTMLInputElement | undefined;

  private defaultValue: boolean | undefined;

  componentWillLoad(): void {
    this.host.addEventListener('focusout', this.checkValidity.bind(this));
  }

  render(): JSX.Element {
    const { host, name, checked, disabled, readOnly, value } = this;
    const inputId = `${name}-${value}-input`;

    return (
      <Host class={host?.className}>
        <input checked={checked} id={inputId} disabled={disabled} name={name} readOnly={readOnly} type="radio" value={value} onClick={this.updateState} />
        <label htmlFor={inputId}>
          <slot />
        </label>
      </Host>
    );
  }

  componentDidLoad(): void {
    if (this.defaultValue === undefined) {
      this.defaultValue = this.nativeInput?.checked ?? this.checked;
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
    return defaultValidationMessage(this.nativeInput);
  }

  /**
   * Returns whether a form will validate when it is submitted, without having to submit it.
   */
  @Method()
  async checkValidity(): Promise<boolean> {
    return defaultCheckValidity<P6RadioValue>({
      name: this.name,
      disabled: this.disabled,
      nativeInput: this.nativeInput,
      p6Valid: this.p6Valid,
      p6Invalid: this.p6Invalid,
      validationMessage: this.validationMessage.bind(this),
      getValue: () => {
        return this.nativeInput?.checked ? this.nativeInput?.value : undefined;
      },
    });
  }

  /**
   * Restores the radio's default value
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
