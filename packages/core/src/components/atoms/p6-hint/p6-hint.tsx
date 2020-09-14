import { Component, ComponentInterface, h, Host, JSX, Prop } from '@stencil/core';
import { Mode } from '../../../shared/types';
import { getModeClass } from '../../../utils/classes';

@Component({
  tag: 'p6-hint',
  styleUrl: 'p6-hint.scss',
  shadow: true,
})
export class P6Hint implements ComponentInterface {
  /**
   * set the mode of the hint
   */
  @Prop() mode: Mode = Mode.default;

  render(): JSX.Element {
    return (
      <Host
        class={{
          ...getModeClass(this.mode),
        }}
      >
        <slot />
      </Host>
    );
  }
}
