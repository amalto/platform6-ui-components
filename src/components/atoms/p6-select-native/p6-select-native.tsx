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
import {
  defaultCheckValidity,
  defaultValidationMessage,
} from "~shared/form/validation";
import { Mode, Size } from "~shared/types";
import { getModeClass, getSizeClass } from "~utils/classes";
import {
  isHTMLOptGroupElement,
  isHTMLOptionElement,
  toArray,
} from "~utils/dom";

export type P6SelectValue = string[] | string | undefined;
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
  @Prop() size: Size = Size.normal;

  /**
   * The Mode of the component to display
   */
  @Prop() mode: Mode = Mode.default;

  /**
   * The select should take the full width
   */
  @Prop({ attribute: "fullWidth" }) fullWidth = false;

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
    return defaultValidationMessage(this.nativeInput);
  }

  /**
   * Returns whether a form will validate when it is submitted, without having to submit it.
   */
  @Method()
  async checkValidity(): Promise<boolean> {
    await defaultCheckValidity<P6SelectValue>({
      name: this.name,
      disabled: this.disabled,
      nativeInput: this.nativeInput,
      p6Valid: this.p6Valid,
      p6Invalid: this.p6Invalid,
      validationMessage: this.validationMessage.bind(this),
      getValue: () => this.inputValue,
    });

    return Promise.resolve(true);
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
            "is-fullwidth": this.fullWidth,
            ...getSizeClass(this.size),
            ...getModeClass(this.mode),
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

  private get inputValue(): string | string[] | undefined {
    if (this.nativeInput === undefined) {
      return undefined;
    }

    const selectedOptions =
      undefined === this.nativeInput
        ? []
        : toArray<HTMLOptionElement, HTMLCollectionOf<HTMLOptionElement>>(
            this.nativeInput.selectedOptions
          );
    const value = selectedOptions.map((option) => option.value);

    return this.multiple ? value : value.shift();
  }

  private onChangeHandler = (): void => {
    this.p6Change.emit({
      name: this.name,
      value: this.inputValue,
    });
  };

  componentWillLoad(): Promise<void> | void {
    this.computeOptions();
  }

  private getOptions(element: Element): HTMLOptionElement[] {
    const subItems = toArray(element.children);
    const options = subItems.filter(isHTMLOptionElement);
    subItems
      .filter(isHTMLOptGroupElement)
      .forEach((subItem) => options.push(...this.getOptions(subItem)));
    return options;
  }

  private computeOptions(): void {
    const options = this.getOptions(this.host);

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
