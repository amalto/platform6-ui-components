import {
  Component,
  Element,
  h,
  Host,
  Listen,
  Method,
  Prop,
  State,
} from "@stencil/core";
import { cleanupAttributes } from "~utils/attribute";

export type P6InputType =
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
  scoped: true,
})
export class P6Input {
  @Element() host!: HTMLP6InputElement;

  /**
   * the input is not available for interaction. The value will not be submitted with the form
   */
  @Prop() disabled = false;

  /**
   * The maximum length or value
   */
  @Prop() max: string | undefined;

  /**
   * The minimum length or value
   */
  @Prop() min: string | undefined;

  /**
   * Enables multiline support (with a textarea instead of an input)
   */
  @Prop() multiline = false;

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
  @Prop() placeholder: string | undefined;

  /**
   * marks an element that can't be edited.
   */
  @Prop() readonly = false;

  /**
   * marks an element that can't be submitted without a value.
   */
  @Prop() required = false;

  /**
   * the content type of the input.
   */
  @Prop() type: P6InputType = "text";

  /**
   * the value of the input.
   */
  @Prop() value: string | undefined;

  /**
   * shows a waiting indicator
   */
  @Prop() waiting = false;

  @State() hasError = false;

  private nativeInput: HTMLInputElement | HTMLTextAreaElement | undefined;

  // eslint-disable-next-line @stencil/prefer-vdom-listener
  @Listen("focusout")
  public lostFocusHandler(): void {
    this.checkValidity();
    this.hasError =
      this.validationMessage !== "" && this.validationMessage !== undefined;
  }

  componentDidLoad(): void {
    this.lostFocusHandler();
  }

  render(): JSX.Element {
    const render =
      this.type === "text" && this.multiline
        ? this.textareaRender.bind(this)
        : this.inputRender.bind(this);

    const classes = {
      "is-danger": this.hasError,
      "is-static": !!this.readonly,
    };

    const containerClass = {
      control: true,
      "is-loading": !!this.waiting,
    };

    return (
      <Host aria-disabled={this.disabled ? "true" : null}>
        <label class="label" htmlFor={`${this.name}-input`}>
          <slot />
        </label>
        <div class={containerClass}>
          {render(`${this.name}-input`, classes)}
        </div>
        {this.renderError()}
      </Host>
    );
  }

  get validity(): ValidityState | undefined {
    return this.nativeInput?.validity;
  }

  get validationMessage(): string | undefined {
    return this.nativeInput?.validationMessage;
  }

  /**
   * Returns whether a form will validate when it is submitted, without having to submit it.
   */
  @Method()
  async checkValidity(): Promise<boolean> {
    return this.nativeInput?.checkValidity() || true;
  }

  private inputRender(
    id: string,
    classes: { [cls: string]: boolean }
  ): JSX.Element {
    const attrs = cleanupAttributes({
      ...this.getCommonAttrs(),
      ...this.getInputAttrs(),
    });

    return (
      <input
        ref={this.setInputRef.bind(this)}
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
      ...this.getTextareaAttrs(),
    });
    return (
      <textarea
        ref={this.setInputRef.bind(this)}
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
    };
  }

  private getInputAttrs(): { [key: string]: unknown } {
    const minMax =
      this.type === "number"
        ? {
            min: this.min,
            max: this.max,
          }
        : {
            minLength: this.min,
            maxLength: this.max,
          };

    const common = {
      type: this.type,
      value: this.value,
      pattern: this.pattern,
    };

    return {
      ...minMax,
      ...common,
    };
  }

  private getTextareaAttrs(): { [key: string]: unknown } {
    return {
      minLength: this.min,
      maxLength: this.max,
    };
  }

  private renderError(): JSX.Element | null {
    return this.hasError && !this.readonly ? (
      <p class="help is-danger">{this.validationMessage}</p>
    ) : null;
  }

  private setInputRef(
    ref: HTMLInputElement | HTMLTextAreaElement | undefined
  ): void {
    this.nativeInput = ref;
  }
}
