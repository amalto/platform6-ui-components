import { Component, Host, h, Prop } from '@stencil/core';
import classNames from 'classnames';

@Component({
  tag: 'p6-checkbox',
  styleUrl: 'p6-checkbox.scss',
  shadow: true,
})
export class P6Checkbox {

  /**
   * Disable
   */
  @Prop() disabled?: boolean = false;

  /**
   * label of the checkbox
   */
  @Prop() label: string;

  render() {
    const { disabled, label } = this;

    return (
      <Host>
        <label class={classNames('checkbox', {
          'disabled': disabled
        })}>
          <input type="checkbox" disabled={disabled} />
          <span class={classNames({
            'has-text-grey-light': disabled
          })}>{label}</span>
        </label>
      </Host>
    );
  }

}
