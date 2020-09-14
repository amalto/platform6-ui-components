import { Component, h, Host, JSX } from '@stencil/core';

@Component({
  tag: 'p6-grid-body',
  styleUrl: 'p6-grid-body.scss',
  shadow: true,
})
export class P6GridBody {
  render(): JSX.Element {
    return (
      <Host>
        <slot />
      </Host>
    );
  }
}
