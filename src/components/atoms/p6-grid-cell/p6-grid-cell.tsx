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
  IconName,
} from "@fortawesome/free-solid-svg-icons";
import { Component, Element, h, Host, Prop } from "@stencil/core";
import { Align } from "~shared/types";
import { isNumber } from "~utils/attribute";

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

export declare type EventCallBack = (event: MouseEvent) => void;

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
  @Prop() align: Align | undefined;

  /**
   * Text align to the left
   */
  @Prop() alignLeft: EventCallBack = () => {};

  /**
   * Text align to the center
   */
  @Prop() alignCenter: EventCallBack = () => {};

  /**
   * Text align to the right
   */
  @Prop() alignRight: EventCallBack = () => {};

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
   * Hide column
   */
  @Prop() hide: EventCallBack = () => {};

  /**
   * Reduce column width
   */
  @Prop() minus: EventCallBack = () => {};

  /**
   * Move the column to the left
   */
  @Prop() moveLeft: EventCallBack = () => {};

  /**
   * Move the column to the right
   */
  @Prop() moveRight: EventCallBack = () => {};

  /**
   * Raise column width
   */
  @Prop() plus: EventCallBack = () => {};

  /**
   * Toggle colorpicker
   */
  @Prop() toggleColor: EventCallBack = () => {};

  /**
   * Sort
   */
  @Prop() sort: EventCallBack = () => {};

  /**
   * Cell width
   */
  @Prop() width: number | string = 100;

  private clickTimeout: NodeJS.Timeout | undefined = undefined;

  private isCurrentAlign(align: Align): boolean {
    return align === this.align;
  }

  private getAlignClass(align: Align): string {
    return this.isCurrentAlign(align) ? "has-text-info" : "has-text-dark";
  }

  private renderAlignIcon(
    align: Align,
    iconName: IconName,
    onClick: EventCallBack
  ): JSX.Element {
    return (
      <div class={this.getAlignClass(align)}>
        <p6-icon name={iconName} onClick={onClick} />
      </div>
    );
  }

  private renderContextMenu(): JSX.Element {
    return (
      <div class="grid-cell-context-menu">
        <div>
          <p6-icon name="chevron-left" onClick={this.moveLeft} />
          <p6-icon name="sort" onClick={this.sort} />
          <p6-icon name="chevron-right" onClick={this.moveRight} />
        </div>
        <div>
          <p6-icon name="trash-alt" onClick={this.hide} />
          <p6-icon name="minus" onClick={this.minus} />
          <p6-icon name="plus" onClick={this.plus} />
        </div>
        <div>
          {this.renderAlignIcon("start", "align-left", this.alignLeft)}
          {this.renderAlignIcon("center", "align-center", this.alignCenter)}
          {this.renderAlignIcon("end", "align-right", this.alignRight)}
        </div>
        <div>
          <p6-icon name="palette" onClick={this.toggleColor} />
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
