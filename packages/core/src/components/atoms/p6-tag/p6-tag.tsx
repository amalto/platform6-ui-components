import { Component, ComponentInterface, h, JSX, Prop } from '@stencil/core';
import { Mode } from '../../../shared/types';
import { getModeClass } from '../../../utils/classes';

@Component({
  tag: 'p6-tag',
  styleUrls: ['p6-tag.scss'],
  shadow: true,
})
export class P6Tag implements ComponentInterface {
  /**
   * Mode
   */
  @Prop() mode!: Mode;

  render(): JSX.Element {
    return (
      <span
        class={{
          tag: true,
          ...getModeClass(this.mode),
        }}
      >
        <slot />
      </span>
    );
  }
}
