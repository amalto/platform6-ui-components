import { Component, h, Host, Prop } from "@stencil/core";

@Component({
  tag: "p6-grid-row",
  styleUrl: "p6-grid-row.scss",
  shadow: true,
})
export class P6GridRow {
  /**
   * Is row selected or not
   */
  @Prop() selected = false;

  render(): JSX.Element {
    return (
      <Host class={this.selected ? "selected" : undefined}>
        <slot />
      </Host>
    );
  }
}