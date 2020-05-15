import { Component, Element, Host, h, Prop, State } from '@stencil/core';

@Component({
  tag: 'p6-radio',
  styleUrl: './p6-radio.scss',
  scoped: true,
})
export class P6Radio {

  @Element() host: HTMLElement;

  /**
   * Radio name
   */
  @Prop() name!: string;

  /**
   * Initial value
   */
  @Prop() checked: boolean = false;

  /**
   * Disable
   */
  @Prop() disabled: boolean = false;

  /**
   * Readonly
   */
  @Prop() readonly: boolean = false;

  /**
   * Value
   */
  @Prop() value!: string | number;

  /**
   * State of the radio
   */
  @State() isChecked: boolean;

  private _onClick() {
    this.isChecked = !this.isChecked;
  }

  componentWillLoad() {
    this.isChecked = this.checked;
  }

  render() {
    const {
      host,
      name,
      isChecked,
      disabled,
      readonly,
      value
    } = this;

    const inputId: string = `${name}-${value}-input`;

    return (
      <Host class={host.className}>
        <input checked={isChecked}
          id={inputId}
          disabled={disabled}
          name={name}
          onClick={this._onClick}
          readonly={readonly}
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
