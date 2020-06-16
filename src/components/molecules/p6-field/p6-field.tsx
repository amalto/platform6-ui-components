import {
  Component,
  ComponentInterface,
  Element,
  h,
  Host,
  State,
} from "@stencil/core";
import { isEmpty } from "~utils/attribute";
import { isInDefaultSlot } from "~utils/component";
import { InputChild } from "./interface";
import { isInputChild } from "./utils";

@Component({
  tag: "p6-field",
  styleUrl: "p6-field.scss",
  scoped: true,
})
export class P6Field implements ComponentInterface {
  @Element() host!: HTMLP6FieldElement;

  @State() errorMessage = "";

  private input: InputChild | undefined;

  componentWillLoad(): void {
    this.host.addEventListener("focusout", this.checkValidity.bind(this));

    this.input = Array.from(this.host.children)
      .filter(isInDefaultSlot)
      .find(isInputChild);

    if (!isEmpty(this.input?.value)) {
      this.checkValidity();
    }
  }

  render(): JSX.Element {
    const errorMessage =
      this.errorMessage !== "" && !this.isReadOnly ? (
        <p6-hint mode="danger" slot="hint">
          {this.errorMessage}
        </p6-hint>
      ) : null;

    return (
      <Host aria-disabled={this.isDisabled ? "true" : null}>
        <label class="label" htmlFor={this.input?.name}>
          <slot name="label" />
          <slot />
        </label>
        {this.isReadOnly || this.isDisabled ? null : (
          <div>
            <slot name="hint" />
            {errorMessage}
          </div>
        )}
      </Host>
    );
  }

  private async checkValidity(): Promise<boolean> {
    const result = this.input?.checkValidity() || true;

    if (typeof result === "boolean") {
      this.errorMessage = await this.validationMessage();
      return Promise.resolve(result);
    }

    const checked = await result;
    this.errorMessage = await this.validationMessage();

    return Promise.resolve(checked);
  }

  private async validationMessage(): Promise<string> {
    const message = this.input?.validationMessage;

    if (typeof message === "string" || message === undefined) {
      return Promise.resolve(message || "");
    }

    return message.call(this.input);
  }

  private get isReadOnly(): boolean {
    return this.input?.readOnly || false;
  }

  private get isDisabled(): boolean {
    return this.input?.disabled || false;
  }
}
