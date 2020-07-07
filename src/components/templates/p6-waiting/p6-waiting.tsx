import { Component, h, Host } from "@stencil/core";

@Component({
  tag: "p6-waiting",
  styleUrl: "p6-waiting.scss",
  scoped: true,
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
