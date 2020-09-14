import { Component, h, Host, JSX } from '@stencil/core';

@Component({
  tag: 'p6-waiting',
  styleUrl: 'p6-waiting.scss',
  shadow: true,
})
export class P6Waiting {
  render(): JSX.Element {
    return (
      <Host>
        <p6-spinner />
        <slot />
      </Host>
    );
  }
}
