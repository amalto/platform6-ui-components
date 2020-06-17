import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faAlignCenter,
  faAlignLeft,
  faAlignRight,
  faChevronLeft,
  faChevronRight,
  faMinus,
  faPalette,
  faPlus,
  faSort,
  faTrashAlt,
} from "@fortawesome/free-solid-svg-icons";
import { Component, Element, h, Host, Prop } from "@stencil/core";
import { isNumber } from "~utils/attribute";
import { EventCallBack } from "./utils";

library.add(
  faChevronLeft,
  faChevronRight,
  faSort,
  faTrashAlt,
  faMinus,
  faPlus,
  faAlignLeft,
  faAlignRight,
  faAlignCenter,
  faPalette
);

@Component({
  tag: "p6-grid-cell",
  styleUrl: "p6-grid-cell.scss",
  scoped: true,
})
export class P6GridCell {
  @Element() host!: HTMLP6GridCellElement;

  /**
   * Cell alignment
   */
  @Prop() align: "start" | "center" | "end" | undefined;

  /**
   * Click callback
   */
  @Prop() clickCallback: EventCallBack | undefined;

  /**
   * Cell text color
   */
  @Prop() color: string | undefined;

  /**
   * Double click callback
   */
  @Prop() dbleClickCallback: EventCallBack | undefined;

  /**
   * Move the column to the left
   */
  @Prop() moveLeft: EventCallBack | undefined;

  /**
   * Move the column to the right
   */
  @Prop() moveRight: EventCallBack | undefined;

  /**
   * Sort
   */
  @Prop() sort: EventCallBack | undefined;

  /**
   * Cell width
   */
  @Prop({ reflect: true }) width: number | string = 100;

  private clickTimeout: NodeJS.Timeout | undefined = undefined;

  private renderContextMenu(): JSX.Element {
    return (
      <div class="grid-cell-context-menu">
        <div>
          <p6-icon name="chevron-left" onClick={this.moveLeft} />
          <p6-icon name="sort" onClick={this.sort} />
          <p6-icon name="chevron-right" onClick={this.moveRight} />
        </div>
        <div>
          <p6-icon name="trash-alt" />
          <p6-icon name="minus" />
          <p6-icon name="plus" />
        </div>
        <div>
          <p6-icon name="align-left" />
          <p6-icon name="align-center" />
          <p6-icon name="align-right" />
        </div>
        <div>
          <p6-icon name="palette" />
        </div>
      </div>
    );
  }

  componentWillLoad(): void {
    const { clickCallback, dbleClickCallback, host } = this;

    if (clickCallback) {
      host.addEventListener("click", (event) => {
        if (!this.clickTimeout) {
          this.clickTimeout = setTimeout(() => {
            clickCallback(event);
            clearTimeout(this.clickTimeout as NodeJS.Timeout);
          }, 500);
        }
      });
    }

    if (dbleClickCallback) {
      host.addEventListener("dblclick", (event) => {
        dbleClickCallback(event);
      });
    }
  }

  render(): JSX.Element {
    const { align, color, width } = this;
    const styles = {
      color,
      justifyContent: align,
      width: `${isNumber(width) ? width : `${width}px`}`,
    };

    return (
      <Host style={styles}>
        {this.renderContextMenu()}
        <slot />
      </Host>
    );
  }
}
