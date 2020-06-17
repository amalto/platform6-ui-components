import { Component, h, Host } from "@stencil/core";

@Component({
  tag: "p6-grid-row",
  styleUrl: "p6-grid-row.scss",
  shadow: true,
})
export class P6GridRow {
  render(): JSX.Element {
    return (
      <Host>
        <slot />
      </Host>
    );
  }
}
