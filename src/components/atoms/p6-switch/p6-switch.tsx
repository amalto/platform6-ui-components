import { Component, Host, h, Prop } from '@stencil/core';

@Component({
  tag: 'p6-switch',
  styleUrl: './p6-switch.scss',
  scoped: true,
})
export class P6Switch {

  /**
   * Initial value
   */
  @Prop() checked: boolean = false;

  /**
   * Disable
   */
  @Prop() disabled: boolean = false;

  /**
   * Switch name
   */
  @Prop() name!: string;

  render() {
    const {
      name,
      checked,
      disabled
    } = this;

    const inputId: string = `${name}-input`;

    return (
      <Host>
        <input checked={checked}
          disabled={disabled}
          id={inputId}
          name={name}
          type="checkbox"
        />
        <label htmlFor={inputId}>
          <slot />
        </label>
      </Host>
    );
  }

}
