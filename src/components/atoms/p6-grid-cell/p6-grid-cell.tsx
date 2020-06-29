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
  State,
} from "@stencil/core";
import { Align, Mode } from "~shared/types";
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
export declare type RenderCellEditComponent = (
  id: string,
  rowIdx: number,
  cellIdx: number
) => HTMLDivElement;

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
   * Index of the cell
   */
  @Prop() cellIdx!: number;

  /**
   * Click callback
   */
  @Prop() clickCallback: CellHeaderAction | undefined;

  /**
   * Cell text color
   */
  @Prop() color: string | undefined;

  /**
   * Disabled templating
   */
  @Prop() disabled = false;

  /**
   * Header id
   */
  @Prop() headerId!: string;

  /**
   * Cell label
   */
  @Prop() label = "-";

  /**
   *
   */
  @Prop() renderCellEditComponent:
    | RenderCellEditComponent
    | undefined = undefined;

  /**
   * Index of the row
   */
  @Prop() rowIdx: number | undefined = undefined;

  /**
   * Cell width
   */
  @Prop() width: number | string = 100;

  /**
   * Editing mode
   */
  @Prop() editing = false;

  /**
   * Text align to the left
   */
  @Event({ eventName: "p6AlignLeft" }) alignLeft:
    | EventEmitter<string>
    | undefined;

  /**
   * Text align to the center
   */
  @Event({ eventName: "p6AlignCenter" }) alignCenter:
    | EventEmitter<string>
    | undefined;

  /**
   * Text align to the right
   */
  @Event({ eventName: "p6AlignRight" }) alignRight:
    | EventEmitter<string>
    | undefined;

  /**
   * Double click callback
   */
  @Event({ eventName: "p6Edit" }) edit:
    | EventEmitter<{ headerId: string; cellIdx: number; rowIdx: number }>
    | undefined;

  /**
   * Hide column
   */
  @Event({ eventName: "p6Hide" }) hide: EventEmitter<string> | undefined;

  /**
   * Reduce column width
   */
  @Event({ eventName: "p6Minus" }) minus: EventEmitter<string> | undefined;

  /**
   * Move the column to the left
   */
  @Event({ eventName: "p6MoveLeft" }) moveLeft:
    | EventEmitter<string>
    | undefined;

  /**
   * Move the column to the right
   */
  @Event({ eventName: "p6MoveRight" }) moveRight:
    | EventEmitter<string>
    | undefined;

  /**
   * Raise column width
   */
  @Event({ eventName: "p6Plus" }) plus: EventEmitter<string> | undefined;

  // /**
  //  * Set color
  //  */
  // @Event() setColor: EventEmitter<string> | undefined;

  /**
   * Sort
   */
  @Event({ eventName: "p6Sort" }) sort: EventEmitter<string> | undefined;

  @State() currentAlign: Align = this.align || "start";

  private clickTimeout: NodeJS.Timeout | undefined = undefined;

  private getAlignMode(align: Align): Mode {
    return align === this.currentAlign ? Mode.default : Mode.info;
  }

  private alignLeftHandler(): void {
    this.alignLeft?.emit(this.headerId);
    this.currentAlign = "start";
  }

  private alignCenterHandler(): void {
    this.alignCenter?.emit(this.headerId);
    this.currentAlign = "center";
  }

  private alignRightHandler(): void {
    this.alignRight?.emit(this.headerId);
    this.currentAlign = "end";
  }

  private getEditComponentId(): string {
    return `${this.headerId}-${this.rowIdx}-${this.cellIdx}`;
  }

  private hideHandler(): void {
    this.hide?.emit(this.headerId);
  }

  private minusHandler(): void {
    this.minus?.emit(this.headerId);
  }

  private moveLeftHandler(): void {
    this.moveLeft?.emit(this.headerId);
  }

  private moveRightHandler(): void {
    this.moveRight?.emit(this.headerId);
  }

  private plusHandler(): void {
    this.plus?.emit(this.headerId);
  }

  private sortHandler(): void {
    this.sort?.emit(this.headerId);
  }

  // private setColorHandler(): void {
  //   this.setColor?.emit(this.headerId);
  // }

  private renderAlignIcon(
    align: Align,
    iconName: IconName,
    onClick: () => void
  ): JSX.Element {
    // FIXME: The result of the getAlignClass is correct but it doesn't dislay the right class
    // need to investigate further
    return (
      <p6-action mode={this.getAlignMode(align)} onClick={onClick}>
        <p6-icon name={iconName} />
      </p6-action>
    );
  }

  private renderIcon = (
    iconName: IconName,
    onClick: () => void
  ): JSX.Element => {
    return (
      <p6-action mode={Mode.info} onClick={onClick}>
        <p6-icon name={iconName} />
      </p6-action>
    );
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
        {/* <div>{this.renderIcon("palette", this.setColorHandler.bind(this))}</div> */}
      </div>
    );
  };

  componentWillLoad(): void {
    const { clickCallback, host } = this;

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

    host.addEventListener("dblclick", () => {
      if (typeof this.rowIdx === "number") {
        this.edit?.emit({
          headerId: this.headerId,
          cellIdx: this.cellIdx,
          rowIdx: this.rowIdx,
        });
      }
    });
  }

  render(): JSX.Element {
    const { align, cellIdx, color, disabled, editing, rowIdx, width } = this;
    const styles = {
      color,
      justifyContent: align,
      width: `${!isNumber(width) ? width : `${width}px`}`,
    };
    const id = this.getEditComponentId();

    return (
      <Host style={styles}>
        {!disabled && this.renderContextMenu()}
        {editing &&
        typeof rowIdx === "number" &&
        this.renderCellEditComponent !== undefined
          ? this.renderCellEditComponent(id, rowIdx, cellIdx)
          : undefined}
        <slot />
      </Host>
    );
  }
}
