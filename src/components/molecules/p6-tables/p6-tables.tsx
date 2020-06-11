import { Component, h, Host } from "@stencil/core";

@Component({
  tag: "p6-tables",
  styleUrl: "p6-tables.scss",
  shadow: true,
})
export class P6Tables {
  render() {
    return (
      <Host>
        <slot />
      </Host>
    );
  }
}
