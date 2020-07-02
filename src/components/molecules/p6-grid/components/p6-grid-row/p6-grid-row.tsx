import { Component, Element, h, Host, Prop } from "@stencil/core";

@Component({
  tag: "p6-grid-row",
  styleUrl: "p6-grid-row.scss",
  shadow: true,
})
export class P6GridRow {
  @Element() host!: HTMLP6GridRowElement;

  /**
   * Change thte context menu coordinate
   */
  @Prop() moveContextMenu: (posX: number, posY: number) => void = () => {};

  /**
   * Set the context menu data
   */
  @Prop() contextMenuCallback: () => void = () => {};

  /**
   * Is row selected or not
   */
  @Prop() selected = false;

  componentDidLoad(): void {
    this.host.addEventListener("contextmenu", (event: MouseEvent) => {
      event.preventDefault();
      this.moveContextMenu(event.clientX, event.clientY);
      this.contextMenuCallback();
    });
  }

  render(): JSX.Element {
    return (
      <Host class={this.selected ? "selected" : undefined}>
        <slot />
      </Host>
    );
  }
}
