import { Component, h, Host } from "@stencil/core";

@Component({
  tag: "p6-label",
  shadow: true,
})
export class P6Label {
  render(): JSX.Element {
    return (
      <Host>
        <slot />
      </Host>
    );
  }
}
