import { Component, h, Host, Prop } from '@stencil/core';

@Component({
  tag: 'p6-checkbox',
  styleUrl: './p6-checkbox.scss',
  scoped: true,
})
export class P6Checkbox {

  /**
   * Initial value
   */
  @Prop() checked: boolean = false;

  /**
   * Disable
   */
  @Prop() disabled: boolean = false;

  /**
   * Checkbox name
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
