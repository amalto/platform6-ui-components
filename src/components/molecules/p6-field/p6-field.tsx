import {
  Component,
  ComponentInterface,
  Element,
  h,
  Host,
  State,
} from "@stencil/core";
import {
  isP6Control,
  isP6NativeControl,
  P6Control,
  P6NativeControl,
} from "~shared/form/control";
import { isInvalidEvent, isValidEvent } from "~shared/form/event";
import { isEmpty } from "~utils/attribute";
import { isInDefaultSlot } from "~utils/component";

// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/explicit-module-boundary-types
function isControl(elmt: any): elmt is P6Control<unknown> | P6NativeControl {
  return isP6Control(elmt) || isP6NativeControl(elmt);
}

function getControl(
  children: HTMLCollection
): P6Control<unknown> | P6NativeControl | undefined {
  return Array.from(children).filter(isInDefaultSlot).find(isControl) as
    | P6Control<unknown>
    | P6NativeControl
    | undefined;
}

@Component({
  tag: "p6-field",
  styleUrl: "p6-field.scss",
  shadow: true,
})
export class P6Field implements ComponentInterface {
  @Element() host!: HTMLP6FieldElement;

  @State() errorMessage = "";

  private input: P6Control<unknown> | P6NativeControl | undefined;

  componentWillLoad(): void {
    this.input = getControl(this.host.children);

    if (this.input !== undefined && isP6NativeControl(this.input)) {
      this.host.addEventListener("focusout", this.updateValidity);
      this.input.addEventListener("invalid", this.invalidNativeHandler);
      if (!isEmpty(this.input?.value)) {
        this.updateValidity();
      }
    }
  }

  componentWillRender(): void {
    const errorHintClassName = "field-auto_hint_message";
    const errorHintMsg = this.host.querySelector(`.${errorHintClassName}`);

    if (errorHintMsg !== null) {
      this.host.removeChild(errorHintMsg);
    }

    if (this.errorMessage !== "" && !this.isReadOnly) {
      const hint = document.createElement("p6-hint");
      hint.innerText = this.errorMessage;
      hint.mode = "danger";
      hint.slot = "hint";
      hint.classList.add(errorHintClassName);
      this.host.appendChild(hint);
    }
  }

  render(): JSX.Element {
    return (
      <Host
        aria-disabled={this.isDisabled ? "true" : null}
        onP6Valid={this.validHandler}
        onP6Invalid={this.invalidHandler}
      >
        <label class="label" htmlFor={this.input?.name}>
          <slot name="label" />
          <slot />
        </label>
        {this.isReadOnly || this.isDisabled ? null : <slot name="hint" />}
      </Host>
    );
  }

  disconnectedCallback(): void {
    if (this.input === undefined) {
      return;
    }

    if (isP6NativeControl(this.input)) {
      this.host.removeEventListener("focusout", this.updateValidity);
    }
  }

  private get isReadOnly(): boolean {
    return this.input?.readOnly || false;
  }

  private get isDisabled(): boolean {
    return this.input?.disabled || false;
  }

  private updateValidity = (): void => {
    if (isP6NativeControl(this.input) && this.input?.checkValidity()) {
      this.errorMessage = "";
    }
  };

  private validHandler = (event: Event): void => {
    if (isValidEvent(event)) {
      this.errorMessage = "";
    }
  };

  private invalidHandler = (event: Event): void => {
    if (isInvalidEvent(event)) {
      this.errorMessage = event.detail.message;
    }
  };

  private invalidNativeHandler = (event: Event): void => {
    if (event.target !== null && "validationMessage" in event.target) {
      const { validationMessage } = event.target;
      this.errorMessage = validationMessage;
    }
  };
}
