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
import {
  defaultCheckValidity,
  defaultValidationMessage,
} from "~shared/form/validation";
import { Size } from "~shared/types";
import { cleanupValue, isEmpty } from "~utils/attribute";
import { getSizeClass } from "~utils/classes";

export type P6TextareaValue = string | undefined;

@Component({
  tag: "p6-textarea",
  styleUrl: "p6-textarea.scss",
  shadow: true,
})
export class P6Textarea
  implements ComponentInterface, P6Control<P6TextareaValue> {
  @Element() host!: HTMLP6TextareaElement;

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
   * The number of rows
   */
  @Prop() rows: number | undefined;

  /**
   * The number of columns
   */
  @Prop() cols: number | undefined;

  /**
   * The name of the input.
   */
  @Prop() name!: string;

  /**
   * The size of the component to display
   */
  @Prop() public size: Size = Size.normal;

  /**
   * content to be appear in the form control when the form control is empty
   */
  @Prop() placeholder: string | undefined;

  /**
   * marks an element that can't be edited.
   */
  @Prop({ attribute: "readOnly" }) readOnly = false;

  /**
   * marks an element that can't be submitted without a value.
   */
  @Prop() required = false;

  /**
   * The user can resize the field
   */
  @Prop() resizable = false;

  /**
   * the value of the input.
   */
  @Prop() value: string | undefined;

  /**
   * shows a waiting indicator
   */
  @Prop() waiting = false;

  @State() hasError = false;

  /**
   * Registering the field in a p6-form
   */
  @Event() p6FormRegister!: EventEmitter<P6Control<P6TextareaValue>>;

  /**
   * Unregistering the field in a p6-form
   */
  @Event() p6FormUnregister!: EventEmitter<P6Control<P6TextareaValue>>;

  /**
   * Fires when the field has been checked for validity and satisfy its constraints
   */
  @Event() p6Valid!: EventEmitter<ValidEventDetail<P6TextareaValue>>;

  /**
   * Fires when the field has been checked for validity and doesn't satisfy its constraints
   */
  @Event() p6Invalid!: EventEmitter<InvalidEventDetail>;

  private nativeInput: HTMLTextAreaElement | undefined;

  componentWillLoad(): void {
    this.host.addEventListener("focusout", this.checkValidity.bind(this));
  }

  render(): JSX.Element {
    const containerClass = {
      control: true,
      "is-loading": !!this.waiting,
    };

    const classes = {
      textarea: true,
      ...getSizeClass(this.size),
      "is-danger": this.hasError,
      "is-static": !!this.readOnly,
      "is-resizable": this.resizable,
    };

    return (
      <Host>
        <form noValidate class={containerClass}>
          <textarea
            class={classes}
            ref={(input): void => {
              this.nativeInput = input;
            }}
            disabled={this.disabled}
            name={this.name}
            placeholder={cleanupValue(this.placeholder)}
            readOnly={this.readOnly}
            required={this.required}
            minLength={this.min}
            maxLength={this.max}
            value={this.value}
            rows={this.rows}
            cols={this.cols}
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
    return defaultCheckValidity<P6TextareaValue>({
      name: this.name,
      nativeInput: this.nativeInput,
      p6Valid: this.p6Valid,
      p6Invalid: this.p6Invalid,
      validationMessage: this.validationMessage.bind(this),
      errorHandler: (hasError) => {
        this.hasError = hasError;
      },
      getValue: () => this.nativeInput?.value,
    });
  }
}
