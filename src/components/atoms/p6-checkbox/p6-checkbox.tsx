import { Component, Element, Host, h, Prop, State } from '@stencil/core';

@Component({
  tag: 'p6-checkbox',
  styleUrl: './p6-checkbox.scss',
  scoped: true,
})
export class P6Checkbox {

  @Element() private host: HTMLElement;

  /**
   * Checkbox name
   */
  @Prop() name?: string;

  /**
   * Initial value
   */
  @Prop() checked?: boolean = false;

  /**
   * Disable
   */
  @Prop() disabled?: boolean = false;

  /**
   * labels of the checkboxes
   */
  @Prop() label: string;

  /**
   * State of the checkbox
   */
  @State() isChecked: boolean;

  private _onClick() {
    this.isChecked = !this.isChecked;
  }

  componentWillLoad() {
    this.name = this.host.id;
    this.isChecked = this.checked;
  }

  render() {
    const {
      name,
      isChecked,
      disabled,
      host,
      label
    } = this;

    const inputId: string = `${host.id}-input`;

    return (
      <Host>
        <div class={disabled ? 'disabled' : ''}>
          <input checked={isChecked}
            disabled={disabled}
            id={inputId}
            name={name || host.id}
            onClick={this._onClick}
            type="checkbox"
          />
          <label htmlFor={inputId}>{label}</label>
        </div>
      </Host>
    );
  }

}
