import { Component, Host, h, Prop, State } from '@stencil/core';

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
   * labels of the checkboxes
   */
  @Prop() label!: string;

  /**
   * Checkbox name
   */
  @Prop() name!: string;

  /**
   * State of the checkbox
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
      name,
      isChecked,
      disabled,
      label
    } = this;

    const inputId: string = `${name}-input`;

    return (
      <Host class={disabled ? 'disabled' : ''}>
        <input checked={isChecked}
          disabled={disabled}
          id={inputId}
          name={name}
          onClick={this._onClick}
          type="checkbox"
        />
        <label htmlFor={inputId}>{label}</label>
      </Host>
    );
  }

}
