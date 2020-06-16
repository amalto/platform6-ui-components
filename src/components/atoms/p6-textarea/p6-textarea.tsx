import {
  Component,
  ComponentInterface,
  Element,
  h,
  Host,
  Method,
  Prop,
  State,
} from "@stencil/core";
import { cleanupValue, isEmpty } from "~utils/attribute";

@Component({
  tag: "p6-textarea",
  styleUrl: "p6-textarea.scss",
  scoped: true,
})
export class P6Textarea implements ComponentInterface {
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
   * The name of the input.
   */
  @Prop() name!: string;

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
   * the value of the input.
   */
  @Prop() value: string | undefined;

  /**
   * shows a waiting indicator
   */
  @Prop() waiting = false;

  @State() hasError = false;

  private nativeInput: HTMLTextAreaElement | undefined;

  componentWillLoad(): void {
    this.host.addEventListener(
      "focusout",
      this.internalCheckValidity.bind(this)
    );
  }

  componentDidLoad(): void {
    if (!isEmpty(this.value)) {
      this.internalCheckValidity();
    }
  }

  render(): JSX.Element {
    const containerClass = {
      "is-loading": !!this.waiting,
    };

    const classes = {
      textarea: true,
      "is-danger": this.hasError,
      "is-static": !!this.readOnly,
    };

    return (
      <Host class={containerClass}>
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
        />
      </Host>
    );
  }

  /**
   * Returns the error message that would be displayed if the user submits the form, or an empty string if no error message.
   * It also triggers the standard error message, such as "this is a required field".
   */
  @Method()
  async validationMessage(): Promise<string> {
    return Promise.resolve(this.nativeInput?.validationMessage || "");
  }

  /**
   * Returns whether a form will validate when it is submitted, without having to submit it.
   */
  @Method()
  async checkValidity(): Promise<boolean> {
    return Promise.resolve(this.nativeInput?.checkValidity() || true);
  }

  private async internalCheckValidity(): Promise<void> {
    await this.checkValidity();
    const msg = await this.validationMessage();
    this.hasError = msg !== "";
  }
}
