import { Component, Element, h, Host, JSX, Prop } from '@stencil/core';

@Component({
  tag: 'p6-grid-row',
  styleUrl: 'p6-grid-row.scss',
  shadow: true,
})
export class P6GridRow {
  @Element() host!: HTMLP6GridRowElement;

  /**
   * Is row selected or not
   */
  @Prop() selected = false;

  render(): JSX.Element {
    return (
      <Host class={this.selected ? 'is-selected' : undefined}>
        <slot />
      </Host>
    );
  }
}
