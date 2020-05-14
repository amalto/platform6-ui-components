import { Component, Host, h, Prop, State } from '@stencil/core';

@Component({
  tag: 'p6-checkbox',
  styleUrl: './p6-checkbox.scss',
  scoped: true,
})
export class P6Checkbox {

  private _input: HTMLInputElement = null;

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

  componentDidLoad() {
    this._input.disabled = this.disabled;
  }

  render() {
    const {
      name,
      isChecked
    } = this;

    const inputId: string = `${name}-input`;

    return (
      <Host>
        <input checked={isChecked}
          id={inputId}
          name={name}
          onClick={this._onClick}
          ref={dom => this._input = dom}
          type="checkbox"
        />
        <label htmlFor={inputId}>
          <slot />
        </label>
      </Host>
    );
  }

}
