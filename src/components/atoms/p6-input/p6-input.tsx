import {
  Component,
  Element,
  h,
  Host,
  Listen,
  Prop,
  State
} from "@stencil/core";
import { cleanupAttributes } from "../../../utils/attribute";

export type Type =
  | "email"
  | "number"
  | "password"
  | "search"
  | "tel"
  | "text"
  | "url";

@Component({
  tag: "p6-input",
  styleUrl: "p6-input.scss",
  scoped: true
})
export class P6Input {
  @Element() host!: HTMLElement;

  @Prop() disabled: boolean = false;
  /**
   * The maximum length or value
   */
  @Prop() max: string;
  /**
   * The minimum length or value
   */
  @Prop() min: string;

  @Prop() multiline: boolean = false;
  /**
   * The name of the input.
   */
  @Prop() name!: string;
  /**
   * Pattern the value must match to be valid.
   */
  @Prop() pattern: string;
  /**
   * content to be appear in the form control when the form control is empty
   */
  @Prop() placeholder: string;
  /**
   * marks an element that can't be edited.
   */
  @Prop() readonly: boolean = false;
  /**
   * marks an element that can't be submitted without a value.
   */
  @Prop() required: boolean = false;
  /**
   * the content type of the input.
   */
  @Prop() type: Type = "text";
  /**
   * the value of the input.
   */
  @Prop() value: string;
  /**
   * shows a waiting indicator
   */
  @Prop() waiting: boolean = false;

  @State() hasError: boolean = false;

  private nativeInput: HTMLInputElement | HTMLTextAreaElement | undefined;

  @Listen("focusout")
  lostFocusHandler() {
    this.checkValidity();
    this.hasError = !!this.validationMessage;
  }

  componentDidLoad() {
    this.checkValidity();
    this.hasError = !!this.validationMessage;
  }

  render() {
    const render =
      this.type === "text" && this.multiline
        ? this.textareaRender.bind(this)
        : this.inputRender.bind(this);

    const classes = {
      "is-danger": this.hasError,
      "is-static": !!this.readonly
    };

    const containerClass = {
      control: true,
      "is-loading": !!this.waiting
    };

    return (
      <Host aria-disabled={this.disabled ? "true" : null}>
        <label class="label" htmlFor={`${this.name}-input`}>
          <slot></slot>
        </label>
        <div class={containerClass}>
          {render(`${this.name}-input`, classes)}
        </div>
        {this.renderError()}
      </Host>
    );
  }

  get validity() {
    return this.nativeInput?.validity;
  }

  get validationMessage(): string {
    return this.nativeInput?.validationMessage || "";
  }

  checkValidity() {
    this.nativeInput?.checkValidity();
  }

  private inputRender(
    id: string,
    classes: { [cls: string]: boolean }
  ): JSX.Element {
    const attrs = cleanupAttributes({
      ...this.getCommonAttrs(),
      ...this.getInputAttrs()
    });
    return (
      <input
        ref={(input: HTMLInputElement) => (this.nativeInput = input)}
        id={id}
        class={{ ...classes, input: true }}
        {...attrs}
        value={this.value}
      />
    );
  }

  private textareaRender(
    id: string,
    classes: { [cls: string]: boolean }
  ): JSX.Element {
    const attrs = cleanupAttributes({
      ...this.getCommonAttrs(),
      ...this.getTextareaAttrs()
    });
    return (
      <textarea
        ref={(input: HTMLTextAreaElement) => (this.nativeInput = input)}
        id={id}
        class={{ ...classes, textarea: true }}
        {...attrs}
      >
        {this.value}
      </textarea>
    );
  }

  private getCommonAttrs(): { [key: string]: unknown } {
    return {
      disabled: this.disabled,
      name: this.name,
      placeholder: this.placeholder,
      readOnly: this.readonly,
      required: this.required,
      pattern: this.pattern
    };
  }
  private getInputAttrs(): { [key: string]: unknown } {
    const minMax =
      this.type === "number"
        ? {
            min: this.min,
            max: this.max
          }
        : {
            minLength: this.min,
            maxLength: this.max
          };

    const common = {
      type: this.type,
      value: this.value
    };

    return {
      ...minMax,
      ...common
    };
  }
  private getTextareaAttrs(): { [key: string]: unknown } {
    return {
      minLength: this.min,
      maxLength: this.max
    };
  }

  private renderError(): JSX.Element | null {
    return this.hasError && !this.readonly ? (
      <p class="help is-danger">{this.validationMessage}</p>
    ) : null;
  }
}
