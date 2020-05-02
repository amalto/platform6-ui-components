import { Component, Host, h, Prop, Element, Listen } from '@stencil/core';

export type Mode = 'danger' | 'warning' | 'default' | 'info' | 'success' | 'primary'
export type Type = 'submit' | 'reset' | 'button'

@Component({
  tag: 'p6-button',
  styleUrl: 'p6-button.scss',
  shadow: true,
})
export class P6Button {
  @Element() el;
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
    const mode = this.isUndefined(this.mode) || this.mode === 'default' ? undefined : `is-${this.mode}`
    const appearance = !!this.outlined ? 'is-outlined' : undefined
    const waiting = !!this.waiting ? 'is-loading' : undefined

    const classes = ['button', appearance, waiting, mode].filter(c => !!c).join(' ')

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
