import { Component, Element, h, Host, Listen, Prop } from '@stencil/core';

export type Mode = 'danger' | 'warning' | 'default' | 'info' | 'success' | 'primary'
export type Type = 'submit' | 'reset' | 'button'

@Component({
  tag: 'p6-button',
  styleUrl: 'p6-button.scss',
  shadow: true,
})
export class P6Button {
  @Element() private el: { closest: (arg0: string) => HTMLFormElement | undefined; };
  /**
   * Mode - set the mode of the button
   */
  @Prop() mode: Mode = 'default';

  /**
   * Outlined
   */
  @Prop() outlined: boolean = false;

  /**
   * Waiting - If set, shows a waiting/busy indicator
   */
  @Prop() waiting: boolean = false;

  /**
   * Type - type of the button.
   */
  @Prop() type: Type = 'submit';

  /**
  * Disabled - If `true`, the user cannot interact with the button.
  */
  @Prop({ reflect: true }) disabled = false;

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
      [`is-${this.mode}`]: !(this.isUndefined(this.mode) || this.mode === 'default'),
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

  private isUndefined(value: Mode | undefined | 'undefined'): value is undefined {
    return value === undefined || value === 'undefined'
  }
}
