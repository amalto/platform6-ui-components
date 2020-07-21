import { Component, Element, h, Host, Prop, State } from "@stencil/core";

@Component({
  tag: "p6-radio",
  styleUrl: "./p6-radio.scss",
  scoped: true,
})
export class P6Radio {
  @Element() host?: HTMLP6RadioElement;

  /**
   * Radio name
   */
  @Prop() name!: string;

  /**
   * Initial value
   */
  @Prop() checked = false;

  /**
   * Disable
   */
  @Prop() disabled = false;

  /**
   * Readonly
   */
  @Prop() readonly = false;

  /**
   * Value
   */
  @Prop() value!: string | number;

  /**
   * State of the radio
   */
  @State() isChecked = false;

  private clickHandler = (event: Event): void => {
    if (this.readonly) {
      event.preventDefault();
      return;
    }
    this.isChecked = !this.isChecked;
  };

  componentWillLoad(): void {
    this.isChecked = this.checked;
  }

  render(): JSX.Element {
    const { host, name, isChecked, disabled, readonly, value } = this;

    const inputId = `${name}-${value}-input`;

    return (
      <Host class={host?.className}>
        <input
          checked={isChecked}
          id={inputId}
          disabled={disabled}
          name={name}
          onClick={this.clickHandler}
          readOnly={readonly}
          type="radio"
          value={value}
        />
        <label htmlFor={inputId}>
          <slot />
        </label>
      </Host>
    );
  }
}
