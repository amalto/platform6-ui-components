import { Component, Element, h, Host, Listen, Prop } from '@stencil/core';
import { isEmpty } from '~utils/attribute';
import { Mode, Size } from '~shared/types';

export type P6ButtonType = 'submit' | 'reset' | 'button'

@Component({
  tag: 'p6-button',
  styleUrl: 'p6-button.scss',
  shadow: true,
})
export class P6Button {
  
  @Element() private el: { closest: (arg0: string) => HTMLFormElement | undefined; };
  
  /**
   * set the mode of the button
   */
  @Prop() mode: Mode = 'default';

  /**
   * Outlined
   */
  @Prop() outlined: boolean = false;

  /**
   * If set, shows a waiting/busy indicator
   */
  @Prop() waiting: boolean = false;

  /**
   * set the size of the button
   */
  @Prop() size: Size = "default";

  /**
   * type of the button.
   */
  @Prop() type: P6ButtonType = 'submit';

  /**
  * Disabled - If `true`, the user cannot interact with the button.
  */
  @Prop() disabled = false;

  @Listen('click')
  clickDelegationHandler() {
    if((this.type === 'submit' || this.type === 'reset')) {
      const form = this.el.closest('form');
      if (form) {
        const nativeButton = document.createElement('button');
        nativeButton.type = this.type;
        nativeButton.style.display = 'none';
        form.appendChild(nativeButton); 
        nativeButton.click();
        form.removeChild(nativeButton);
      }
    }
  }

  render() {
    const classes = {
      'button': true, 
      [`is-${this.mode}`]: !isEmpty(this.mode) && this.mode !== 'default',
      [`is-${this.size}`]: !isEmpty(this.size) && this.size !== 'default',
      'is-outlined' : !!this.outlined, 
      'is-loading': !!this.waiting, 
    }

    return (
      <Host>
        <button class={classes} type={this.type} disabled={this.disabled}>
          <slot></slot>
        </button>
      </Host>
    );
  }
}
