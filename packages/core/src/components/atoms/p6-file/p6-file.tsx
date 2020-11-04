import { icon } from '@fortawesome/fontawesome-svg-core';
import { Component, ComponentInterface, Element, Event, EventEmitter, h, Host, JSX, Method, Prop, State } from '@stencil/core';
import { P6Control } from '../../../shared/form/control';
import { InvalidEventDetail, ValidEventDetail } from '../../../shared/form/event';
import { defaultCheckValidity, defaultValidationMessage } from '../../../shared/form/validation';
import { Mode, Size } from '../../../shared/types';
import { noop } from '../../../utils';
import { cleanupValue, isEmpty } from '../../../utils/attribute';
import { getModeClass, getSizeClass } from '../../../utils/classes';

export type P6FileValue = File[] | undefined;

@Component({
  tag: 'p6-file',
  styleUrl: 'p6-file.scss',
  shadow: true,
})
export class P6File implements ComponentInterface, P6Control<P6FileValue> {
  @Element() host!: HTMLP6FileElement;

  /**
   * A string that defines the file types the file input should accept.
   * This string is a comma-separated list of filename extension or MIME type
   * example : ".jpg,.png,image/*"
   */
  @Prop() accept: string | undefined;

  /**
   * the input is not available for interaction. The value will not be submitted with the form
   */
  @Prop() disabled = false;

  /**
   * set the mode of the button
   */
  @Prop() mode: Mode = Mode.default;

  /**
   * The name of the input.
   */
  @Prop() name!: string;

  /**
   * Outlined
   */
  @Prop() outlined = false;

  /**
   * content to be appear in the form control when the form control is empty
   */
  @Prop() placeholder!: string;

  /**
   * marks an element that can't be submitted without a value.
   */
  @Prop() required = false;

  /**
   * set the size of the button
   */
  @Prop() size: Size = Size.normal;

  /**
   * the value of the input.
   */
  @Prop() value: string | undefined;

  @State() hasError = false;

  /**
   * Registering the field in a p6-form
   */
  @Event() p6FormRegister!: EventEmitter<P6Control<P6FileValue>>;

  /**
   * Unregistering the field in a p6-form
   */
  @Event() p6FormUnregister!: EventEmitter<P6Control<P6FileValue>>;

  /**
   * Fires when the field has been checked for validity and satisfy its constraints
   */
  @Event() p6Valid!: EventEmitter<ValidEventDetail<File[] | undefined>>;

  /**
   * Fires when the field has been checked for validity and doesn't satisfy its constraints
   */
  @Event() p6Invalid!: EventEmitter<InvalidEventDetail>;

  /**
   * Fires after the selection of the files
   */
  @Event() p6Change!: EventEmitter<File[]>;

  private nativeInput: HTMLInputElement | undefined;

  private defaultValue: string | number | undefined;

  componentWillLoad(): void {
    if (this.defaultValue === undefined) {
      this.defaultValue = this.value;
    }
  }

  render(): JSX.Element {
    const containerClass = {
      'file': true,
      ...getModeClass(this.mode),
      ...getSizeClass(this.size),
      'is-outlined': this.outlined,
      'is-disabled': this.disabled,
    };

    const classes = {
      'file-input': true,
      'is-danger': this.hasError,
    };
    const img = icon({ prefix: 'fas', iconName: 'upload' });

    return (
      <Host>
        <form noValidate class={containerClass}>
          <label class="file-label">
            <input
              class={classes}
              ref={(input): void => {
                this.nativeInput = input;
              }}
              accept={this.accept}
              disabled={this.disabled}
              name={this.name}
              required={this.required}
              type="file"
              onChange={this.onChangeHandler()}
            />
            <span class="file-cta">
              <span class="file-icon" innerHTML={img.html[0]} />
              <span class="file-label">{cleanupValue(this.placeholder)}</span>
            </span>
          </label>
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
    return defaultCheckValidity<File[]>({
      name: this.name,
      disabled: false,
      nativeInput: this.nativeInput,
      p6Valid: this.p6Valid,
      p6Invalid: this.p6Invalid,
      validationMessage: this.validationMessage.bind(this),
      errorHandler: hasError => {
        this.hasError = hasError;
      },
      getValue: (): File[] => this.files,
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

  private get files(): File[] {
    return this.nativeInput?.files === undefined || this.nativeInput?.files === null ? [] : Array.from(this.nativeInput.files);
  }

  private onChangeHandler(): (event: Event) => void {
    return event => {
      event.stopPropagation();
      event.preventDefault();

      this.checkValidity()
        .then(isChecked => {
          const isValid = isChecked && this.nativeInput?.validationMessage === '';
          if (isValid) {
            this.p6Change.emit(this.files);
          }
          return isValid;
        })
        .catch(noop);
    };
  }
}
