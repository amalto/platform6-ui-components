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
import { EMPTY_LABEL } from "../../utils";

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
  @Prop() label = EMPTY_LABEL;

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
  @Event() p6AlignLeft: EventEmitter<string> | undefined;

  /**
   * Text align to the center
   */
  @Event() p6AlignCenter: EventEmitter<string> | undefined;

  /**
   * Text align to the right
   */
  @Event() p6AlignRight: EventEmitter<string> | undefined;

  /**
   * Double click callback
   */
  @Event() p6Edit:
    | EventEmitter<{ headerId: string; cellIdx: number; rowIdx: number }>
    | undefined;

  /**
   * Hide column
   */
  @Event() p6Hide: EventEmitter<string> | undefined;

  /**
   * Reduce column width
   */
  @Event() p6Minus: EventEmitter<string> | undefined;

  /**
   * Move the column to the left
   */
  @Event() p6MoveLeft: EventEmitter<string> | undefined;

  /**
   * Move the column to the right
   */
  @Event() p6MoveRight: EventEmitter<string> | undefined;

  /**
   * Raise column width
   */
  @Event() p6Plus: EventEmitter<string> | undefined;

  /**
   * Sort
   */
  @Event() p6Sort: EventEmitter<string> | undefined;

  @State() currentAlign: Align = this.align || "start";

  private clickTimeout: NodeJS.Timeout | undefined = undefined;

  private getAlignMode(align: Align): Mode {
    return align === this.currentAlign ? Mode.default : Mode.info;
  }

  private alignLeftHandler = (): void => {
    this.p6AlignLeft?.emit(this.headerId);
    this.currentAlign = "start";
  };

  private alignCenterHandler = (): void => {
    this.p6AlignCenter?.emit(this.headerId);
    this.currentAlign = "center";
  };

  private alignRightHandler = (): void => {
    this.p6AlignRight?.emit(this.headerId);
    this.currentAlign = "end";
  };

  private getEditComponentId(): string {
    return `${this.headerId}-${this.rowIdx}-${this.cellIdx}`;
  }

  private hideHandler = (): void => {
    this.p6Hide?.emit(this.headerId);
  };

  private minusHandler = (): void => {
    this.p6Minus?.emit(this.headerId);
  };

  private moveLeftHandler = (): void => {
    this.p6MoveLeft?.emit(this.headerId);
  };

  private moveRightHandler = (): void => {
    this.p6MoveRight?.emit(this.headerId);
  };

  private plusHandler = (): void => {
    this.p6Plus?.emit(this.headerId);
  };

  private sortHandler = (): void => {
    this.p6Sort?.emit(this.headerId);
  };

  private renderAlignIcon = (
    align: Align,
    iconName: IconName,
    onClick: () => void
  ): JSX.Element => {
    return (
      <p6-action mode={this.getAlignMode(align)} onClick={onClick}>
        <p6-icon name={iconName} />
      </p6-action>
    );
  };

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
          {this.renderIcon("chevron-left", this.moveLeftHandler)}
          {this.renderIcon("sort", this.sortHandler)}
          {this.renderIcon("chevron-right", this.moveRightHandler)}
        </div>
        <div>
          {this.renderIcon("trash-alt", this.hideHandler)}
          {this.renderIcon("minus", this.minusHandler)}
          {this.renderIcon("plus", this.plusHandler)}
        </div>
        <div>
          {this.renderAlignIcon("start", "align-left", this.alignLeftHandler)}
          {this.renderAlignIcon(
            "center",
            "align-center",
            this.alignCenterHandler
          )}
          {this.renderAlignIcon("end", "align-right", this.alignRightHandler)}
        </div>
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
        this.p6Edit?.emit({
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
