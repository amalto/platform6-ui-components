import { Component, Element, h, Host } from "@stencil/core";
// import { isRowCell } from "./utils";

@Component({
  tag: "p6-grid",
  styleUrl: "p6-grid.scss",
  shadow: true,
})
export class P6Tables {
  @Element() host!: HTMLP6GridElement;

  render(): JSX.Element {
    return (
      <Host>
        <slot />
      </Host>
    );
  }
}
