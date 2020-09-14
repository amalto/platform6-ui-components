import { Component, ComponentInterface, Element, h, Host, JSX, Prop } from '@stencil/core';
import { Mode, Size } from '../../../shared/types';
import { getModeClass, getSizeClass } from '../../../utils/classes';

@Component({
  tag: 'p6-action',
  styleUrl: 'p6-action.scss',
  shadow: true,
})
export class P6Action implements ComponentInterface {
  @Element() host!: HTMLP6ActionElement;

  /**
   * set the mode of the action
   */
  @Prop() mode: Mode = Mode.default;

  /**
   * If set, shows a waiting/busy indicator
   */
  @Prop() waiting = false;

  /**
   * If `true`, the user cannot interact with the Action.
   */
  @Prop() disabled = false;

  /**
   * set the size of the action
   */
  @Prop() size: Size = Size.normal;

  render(): JSX.Element {
    const classes = {
      'is-loading': !!this.waiting,
      ...getModeClass(this.mode),
      ...getSizeClass(this.size),
    };

    return (
      <Host aria-disabled={this.disabled ? 'true' : null}>
        <button type="button" disabled={this.disabled} class={classes}>
          <slot />
        </button>
      </Host>
    );
  }
}
