import { Component, h, Host } from '@stencil/core';

@Component({
  tag: 'p6-container',
  styleUrl: 'p6-container.scss',
  shadow: true,
})
export class P6Container {
  render(): HTMLP6ContainerElement {
    return (
      <Host>
        <slot />
      </Host>
    );
  }
}
