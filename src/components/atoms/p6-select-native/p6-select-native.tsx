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
} from "@stencil/core";
import { P6Control } from "~shared/form/control";
import { InvalidEventDetail, ValidEventDetail } from "~shared/form/event";
import { Mode, Size } from "~shared/types";
import { isHTMLOptionElement, toArray } from "~utils/dom";

export type P6SelectValue = string[];
export type P6SelectControl = P6Control<P6SelectValue>;

@Component({
  tag: "p6-select-native",
  styleUrl: "p6-select-native.scss",
  shadow: true,
})
export class P6SelectNative implements ComponentInterface, P6SelectControl {
  /**
   * The name
   */
  @Prop() name!: string;

  /**
   * Is multiple
   */
  @Prop() multiple = false;

  /**
   * The size of the component to display
   */
  @Prop() size: Size = "small";

  /**
   * The Mode of the component to display
   */
  @Prop() mode: Mode = "default";

  /**
   * The select is not available for interaction. The value will not be submitted with the form
   */
  @Prop() disabled = false;

  /**
   * Marks the select as required. It can't be submitted without a value
   */
  @Prop() required = false;

  /**
   * Marks as read only.
   */
  @Prop({ attribute: "readOnly" }) readOnly = false;

  /**
   * When the select is valid
   */
  @Event() p6Valid!: EventEmitter<ValidEventDetail<P6SelectValue>>;

  /**
   * When the select is invalid
   */
  @Event() p6Invalid!: EventEmitter<InvalidEventDetail>;

  /**
   * When the select ask to register
   */
  @Event() p6FormRegister!: EventEmitter<P6SelectControl>;

  /**
   * When the select ask to unregister
   */
  @Event() p6FormUnregister!: EventEmitter<P6SelectControl>;

  /**
   * When the value change
   */
  @Event() p6Change!: EventEmitter<ValidEventDetail<P6SelectValue>>;

  @Element() host!: HTMLP6SelectNativeElement;

  private nativeInput: HTMLSelectElement | undefined;

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
    const message = await this.validationMessage();

    if (message !== "") {
      const invalidInit = {
        name: this.name,
        message,
      };
      this.p6Invalid.emit(invalidInit);
    } else {
      const selectedOptions =
        undefined === this.nativeInput
          ? []
          : toArray<HTMLOptionElement, HTMLCollectionOf<HTMLOptionElement>>(
              this.nativeInput.selectedOptions
            );

      const validInit = {
        name: this.name,
        value: selectedOptions.map((option) => option.value),
      };
      this.p6Valid.emit(validInit);
    }

    return Promise.resolve(this.nativeInput?.checkValidity() || true);
  }

  render(): JSX.Element {
    return (
      <Host
        aria-disabled={this.disabled ? "true" : null}
        required={this.required}
      >
        <div
          class={{
            select: true,
            "is-fullwidth": true,
            [`is-${this.size}`]: true,
            [`is-${this.mode}`]: true,
          }}
        >
          <select
            name={this.name}
            disabled={this.disabled}
            multiple={this.multiple}
            onBlur={this.onChangeHandler}
            ref={(input): void => {
              this.nativeInput = input;
            }}
          />
        </div>
      </Host>
    );
  }

  private onChangeHandler = (event: Event): void => {
    const target = event.target as HTMLSelectElement;

    this.p6Change.emit({
      name: "select",
      value: toArray(target.selectedOptions).map(
        (option) => (option as HTMLOptionElement).value
      ),
    });
  };

  componentWillLoad(): Promise<void> | void {
    this.computeOptions();
  }

  private computeOptions(): void {
    const options = toArray(this.host.children).filter(isHTMLOptionElement);

    if (options.length === 0) {
      return;
    }

    if (options.find((option) => option.selected) === undefined) {
      const emptyOption = options.find((child) => child.value === "");
      if (emptyOption !== undefined) {
        emptyOption.selected = true;
      } else {
        options[0].selected = true;
      }
    }

    if (this.readOnly) {
      options
        .filter((option) => !option.selected)
        .forEach((child) => {
          child.setAttribute("disabled", "true");
        });
    }
  }

  componentDidRender(): void {
    toArray(this.host.children).forEach((child) =>
      this.nativeInput?.appendChild(child)
    );
  }

  componentDidLoad(): void {
    this.p6FormRegister.emit(this);
  }

  disconnectedCallback(): void {
    this.p6FormUnregister.emit(this);
  }
}
