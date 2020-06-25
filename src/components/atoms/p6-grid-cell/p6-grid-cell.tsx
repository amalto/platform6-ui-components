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
import {
  Component,
  Element,
  Event,
  EventEmitter,
  h,
  Host,
  Prop,
} from "@stencil/core";
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

export declare type CellHeaderAction = (id: string) => void;

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
  @Event() alignLeft: EventEmitter<string> | undefined;

  /**
   * Text align to the center
   */
  @Event() alignCenter: EventEmitter<string> | undefined;

  /**
   * Text align to the right
   */
  @Event() alignRight: EventEmitter<string> | undefined;

  /**
   * Click callback
   */
  @Prop() clickCallback: CellHeaderAction | undefined;

  /**
   * Cell text color
   */
  @Prop() color: string | undefined;

  /**
   * Double click callback
   */
  @Prop() dbleClickCallback: CellHeaderAction | undefined;

  /**
   * Disabled templating
   */
  @Prop() disabled = false;

  /**
   * Header id
   */
  @Prop() headerId!: string;

  /**
   * Hide column
   */
  @Event() hide: EventEmitter<string> | undefined;

  /**
   * Reduce column width
   */
  @Event() minus: EventEmitter<string> | undefined;

  /**
   * Move the column to the left
   */
  @Event() moveLeft: EventEmitter<string> | undefined;

  /**
   * Move the column to the right
   */
  @Event() moveRight: EventEmitter<string> | undefined;

  /**
   * Raise column width
   */
  @Event() plus: EventEmitter<string> | undefined;

  /**
   * Set color
   */
  @Event() setColor: EventEmitter<string> | undefined;

  /**
   * Sort
   */
  @Event() sort: EventEmitter<string> | undefined;

  /**
   * Cell width
   */
  @Prop() width: number | string = 100;

  private clickTimeout: NodeJS.Timeout | undefined = undefined;

  private isCurrentAlign(align: Align): boolean {
    return align === this.align;
  }

  private getAlignClass(align: Align): string {
    return this.isCurrentAlign(align) ? "has-text-dark" : "has-text-info";
  }

  private alignLeftHandler(): void {
    if (this.alignLeft) {
      this.alignLeft.emit(this.headerId);
    }
  }

  private alignCenterHandler(): void {
    if (this.alignCenter) {
      this.alignCenter.emit(this.headerId);
    }
  }

  private alignRightHandler(): void {
    if (this.alignRight) {
      this.alignRight.emit(this.headerId);
    }
  }

  private hideHandler(): void {
    if (this.hide) {
      this.hide.emit(this.headerId);
    }
  }

  private minusHandler(): void {
    if (this.minus) {
      this.minus.emit(this.headerId);
    }
  }

  private moveLeftHandler(): void {
    if (this.moveLeft) {
      this.moveLeft.emit(this.headerId);
    }
  }

  private moveRightHandler(): void {
    if (this.moveRight) {
      this.moveRight.emit(this.headerId);
    }
  }

  private plusHandler(): void {
    if (this.plus) {
      this.plus.emit(this.headerId);
    }
  }

  private sortHandler(): void {
    if (this.sort) {
      this.sort.emit(this.headerId);
    }
  }

  private setColorHandler(): void {
    if (this.setColor) {
      this.setColor.emit(this.headerId);
    }
  }

  private renderAlignIcon(
    align: Align,
    iconName: IconName,
    onClick: () => void
  ): JSX.Element {
    // FIXME: The result of the getAlignClass is correct but it doesn't dislay the right class
    // need to investigate further
    return (
      <div class={this.getAlignClass(align)}>
        <p6-icon name={iconName} onClick={onClick} />
      </div>
    );
  }

  private renderIcon = (
    iconName: IconName,
    onClick: () => void
  ): JSX.Element => {
    return <p6-icon name={iconName} onClick={onClick} />;
  };

  private renderContextMenu = (): JSX.Element => {
    return (
      <div class="grid-cell-context-menu">
        <div>
          {this.renderIcon("chevron-left", this.moveLeftHandler.bind(this))}
          {this.renderIcon("sort", this.sortHandler.bind(this))}
          {this.renderIcon("chevron-right", this.moveRightHandler.bind(this))}
        </div>
        <div>
          {this.renderIcon("trash-alt", this.hideHandler.bind(this))}
          {this.renderIcon("minus", this.minusHandler.bind(this))}
          {this.renderIcon("plus", this.plusHandler.bind(this))}
        </div>
        <div>
          {this.renderAlignIcon(
            "start",
            "align-left",
            this.alignLeftHandler.bind(this)
          )}
          {this.renderAlignIcon(
            "center",
            "align-center",
            this.alignCenterHandler.bind(this)
          )}
          {this.renderAlignIcon(
            "end",
            "align-right",
            this.alignRightHandler.bind(this)
          )}
        </div>
        <div>{this.renderIcon("palette", this.setColorHandler.bind(this))}</div>
      </div>
    );
  };

  componentWillLoad(): void {
    const { clickCallback, dbleClickCallback, host } = this;

    if (clickCallback) {
      host.addEventListener("click", () => {
        if (!this.clickTimeout) {
          this.clickTimeout = setTimeout(() => {
            clickCallback(this.headerId);
            clearTimeout(this.clickTimeout as NodeJS.Timeout);
          }, 500);
        }
      });
    }

    if (dbleClickCallback) {
      host.addEventListener("dblclick", () => {
        dbleClickCallback(this.headerId);
      });
    }
  }

  render(): JSX.Element {
    const { align, color, disabled, width } = this;
    const styles = {
      color,
      justifyContent: align,
      width: `${!isNumber(width) ? width : `${width}px`}`,
    };

    return (
      <Host style={styles}>
        {!disabled && this.renderContextMenu()}
        <slot />
      </Host>
    );
  }
}
