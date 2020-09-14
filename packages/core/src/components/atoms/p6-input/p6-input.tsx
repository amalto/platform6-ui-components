import { Component, ComponentInterface, Element, Event, EventEmitter, h, Host, JSX, Method, Prop, State } from '@stencil/core';
import { P6Control } from '../../../shared/form/control';
import { InvalidEventDetail, ValidEventDetail } from '../../../shared/form/event';
import { defaultCheckValidity, defaultValidationMessage } from '../../../shared/form/validation';
import { cleanupValue, isEmpty } from '../../../utils/attribute';
import { P6InputType } from './types';

export type P6InputValue = string | number | undefined;

@Component({
  tag: 'p6-input',
  styleUrl: 'p6-input.scss',
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
  @Prop() placeholder = '';

  /**
   * marks an element that can't be edited.
   */
  @Prop({ attribute: 'readOnly' }) readOnly = false;

  /**
   * marks an element that can't be submitted without a value.
   */
  @Prop() required = false;

  /**
   * the content type of the input.
   */
  @Prop() type: P6InputType = P6InputType.text;

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

  private defaultValue: string | number | undefined;

  componentWillLoad(): void {
    this.host.addEventListener('focusout', this.checkValidity.bind(this));

    if (this.defaultValue === undefined) {
      this.defaultValue = this.value;
    }
  }

  render(): JSX.Element {
    const containerClass = {
      'control': true,
      'is-loading': !!this.waiting,
    };

    const classes = {
      'input': true,
      'is-danger': this.hasError,
      'is-static': !!this.readOnly,
    };

    return (
      <Host>
        <form noValidate class={containerClass}>
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
            type={P6InputType[this.type]}
            value={this.value}
            {...this.minMaxAttrs}
          />
        </form>
      </Host>
    );
  }

  async componentDidLoad(): Promise<void> {
    if (!isEmpty(this.value)) {
      await this.checkValidity();
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
    return defaultCheckValidity<P6InputValue>({
      name: this.name,
      disabled: this.disabled,
      nativeInput: this.nativeInput,
      p6Valid: this.p6Valid,
      p6Invalid: this.p6Invalid,
      validationMessage: this.validationMessage.bind(this),
      errorHandler: hasError => {
        this.hasError = hasError;
      },
      getValue: () => this.inputValue,
    });
  }

  /**
   * Restores the input's default value
   */
  @Method()
  async reset(): Promise<boolean> {
    let result = false;

    if (this.nativeInput) {
      this.nativeInput.value = this.defaultValue !== undefined ? this.defaultValue.toString() : '';
      result = true;
    }

    return Promise.resolve(result);
  }

  private get minMaxAttrs(): { min?: number; max?: number } | { minLength?: number; maxLength?: number } {
    return this.type === P6InputType.number
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

    if (this.nativeInput.type === P6InputType[P6InputType.number]) {
      return this.nativeInput.valueAsNumber;
    }

    return this.nativeInput.value;
  }
}
