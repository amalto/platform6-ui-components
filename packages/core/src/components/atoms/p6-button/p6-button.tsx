import { Component, ComponentInterface, Element, h, JSX, Prop } from '@stencil/core';
import { Mode, Size } from '../../../shared/types';
import { getModeClass, getSizeClass } from '../../../utils/classes';

export type P6ButtonType = 'submit' | 'reset' | 'button';

@Component({
  tag: 'p6-button',
  styleUrl: 'p6-button.scss',
  shadow: true,
})
export class P6Button implements ComponentInterface {
  @Element() host!: HTMLP6ButtonElement;

  /**
   * set the mode of the button
   */
  @Prop() mode: Mode = Mode.default;

  /**
   * Outlined
   */
  @Prop() outlined = false;

  /**
   * If set, shows a waiting/busy indicator
   */
  @Prop() waiting = false;

  /**
   * set the size of the button
   */
  @Prop() size: Size = Size.normal;

  /**
   * type of the button.
   */
  @Prop() type: P6ButtonType = 'submit';

  /**
   * Disabled - If `true`, the user cannot interact with the button.
   */
  @Prop() disabled = false;

  private clickDelegationHandler = (): void => {
    if (this.type === 'submit' || this.type === 'reset') {
      const form = this.host?.closest('form');
      if (form !== null && form !== undefined) {
        const nativeButton = document.createElement('button');
        nativeButton.type = this.type;
        nativeButton.style.display = 'none';
        form.appendChild(nativeButton);
        nativeButton.click();
        form.removeChild(nativeButton);
      }
    }
  };

  render(): JSX.Element {
    const classes = {
      'button': true,
      ...getModeClass(this.mode),
      ...getSizeClass(this.size),
      'is-outlined': this.outlined,
      'is-loading': this.waiting,
    };

    return (
      <button
        class={classes}
        // eslint-disable-next-line react/button-has-type
        type={this.type}
        disabled={this.disabled}
        aria-disabled={this.disabled ? 'true' : null}
        onClick={this.clickDelegationHandler}
      >
        <slot />
      </button>
    );
  }
}
