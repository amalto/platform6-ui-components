import { Component, Element, h, Host, JSX } from '@stencil/core';

@Component({
  tag: 'p6-grid-header',
  styleUrl: 'p6-grid-header.scss',
  shadow: true,
})
export class P6GridHeader {
  @Element() host!: HTMLP6GridHeaderElement;

  render(): JSX.Element {
    return (
      <Host>
        <slot />
      </Host>
    );
  }
}
