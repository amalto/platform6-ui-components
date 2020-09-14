import { icon } from '@fortawesome/fontawesome-svg-core';
import { Component, h, JSX, Prop } from '@stencil/core';
import { Mode, Position } from '../../../shared/types';
import { isDefaultMode, isDefaultPosition } from '../../../utils/attribute';

@Component({
  tag: 'p6-help',
  styleUrl: 'p6-help.scss',
  shadow: true,
})
export class P6Help {
  /**
   * Tooltip text
   */
  @Prop() text!: string;

  /**
   * Tooltip position (default position is top)
   */
  @Prop() position: Position = Position.top;

  /**
   * Tooltip mode
   */
  @Prop() mode: Mode = Mode.default;

  render(): JSX.Element | null {
    const img = icon({ prefix: 'fas', iconName: 'question-circle' });

    return (
      <div
        class={{
          'has-tooltip-arrow': true,
          [`has-tooltip-${Position[this.position]}`]: !isDefaultPosition(this.position, Position.top),
          [`has-tooltip-${Mode[this.mode]}`]: !isDefaultMode(this.mode),
        }}
        innerHTML={img.html[0]}
        data-tooltip={this.text}
      />
    );
  }
}
