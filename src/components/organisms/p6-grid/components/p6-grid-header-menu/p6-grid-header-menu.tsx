import {
  Component,
  ComponentInterface,
  Event,
  EventEmitter,
  h,
  Prop,
} from "@stencil/core";
import { Alignment, Direction, SortOrder } from "~shared/types";
import { INC_WIDTH } from "../../core/column";
import {
  AlignColumnDetail,
  Column,
  DataItem,
  MoveColumnDetail,
  ResizeColumnDetail,
  ShowColumnDetail,
  SortColumnDetail,
} from "../../core/entities";
import { P6GridActionItem } from "../p6-grid-action-item";

@Component({
  tag: "p6-grid-header-menu",
  styleUrl: "p6-grid-header-menu.scss",
  shadow: true,
})
export class P6GridHeaderMenu implements ComponentInterface {
  /**
   * the column
   */
  @Prop() column!: Column<DataItem>;

  /**
   * Cell alignment
   */
  @Prop() align!: Alignment;

  /**
   * the sort order of this column
   */
  @Prop() sortOrder!: SortOrder;

  /**
   * Update the alignement of the column
   */
  @Event() p6AlignColumn!: EventEmitter<AlignColumnDetail<DataItem>>;

  /**
   * Move the column to the left or to the right
   */
  @Event() p6MoveColumn!: EventEmitter<MoveColumnDetail<DataItem>>;

  /**
   * Resize the column
   */
  @Event() p6ResizeColumn!: EventEmitter<ResizeColumnDetail<DataItem>>;

  /**
   * Update the visibility of the column
   */
  @Event() p6ShowColumn!: EventEmitter<ShowColumnDetail<DataItem>>;

  /**
   * Sort the column
   */
  @Event() p6SortColumn!: EventEmitter<SortColumnDetail<DataItem>>;

  render(): JSX.Element {
    return (
      <host>
        <div>
          <P6GridActionItem
            icon="chevron-left"
            clickHandler={this.moveColumnHandler(Direction.Left)}
          />
          <P6GridActionItem
            icon="sort"
            clickHandler={this.sortColumnHandler()}
          />
          <P6GridActionItem
            icon="chevron-right"
            clickHandler={this.moveColumnHandler(Direction.Right)}
          />
        </div>
        <div>
          <P6GridActionItem
            icon="trash-alt"
            clickHandler={this.showColumnHandler(false)}
          />
          <P6GridActionItem
            icon="minus"
            clickHandler={this.resizeColumnHandler(INC_WIDTH * -1)}
          />
          <P6GridActionItem
            icon="plus"
            clickHandler={this.resizeColumnHandler(INC_WIDTH)}
          />
        </div>
        <div>
          <P6GridActionItem
            icon="align-left"
            clickHandler={this.alignColumnHandler(Alignment.Start)}
            disabled={this.isAlignmentDisabled(Alignment.Start)}
          />
          <P6GridActionItem
            icon="align-center"
            clickHandler={this.alignColumnHandler(Alignment.Center)}
            disabled={this.isAlignmentDisabled(Alignment.Center)}
          />
          <P6GridActionItem
            icon="align-right"
            clickHandler={this.alignColumnHandler(Alignment.End)}
            disabled={this.isAlignmentDisabled(Alignment.End)}
          />
        </div>
      </host>
    );
  }

  private get nextSortOrder(): SortOrder {
    if (this.sortOrder === SortOrder.None) {
      return SortOrder.Asc;
    }

    if (this.sortOrder === SortOrder.Asc) {
      return SortOrder.Desc;
    }

    return SortOrder.None;
  }

  private alignColumnHandler(alignment: Alignment): (event: Event) => void {
    return () => {
      this.p6AlignColumn.emit({ column: { ...this.column, align: alignment } });
    };
  }

  private moveColumnHandler(direction: Direction): (event: Event) => void {
    return () => {
      this.p6MoveColumn.emit({ column: this.column, direction });
    };
  }

  private resizeColumnHandler(offset: number): (event: Event) => void {
    return () => {
      this.p6ResizeColumn.emit({
        column: { ...this.column, width: this.column.width + offset },
      });
    };
  }

  private sortColumnHandler(): (event: Event) => void {
    return () => {
      this.p6SortColumn.emit({
        column: { ...this.column, sortOrder: this.nextSortOrder },
      });
    };
  }

  private showColumnHandler(visible: boolean): (event: Event) => void {
    return () => {
      this.p6ShowColumn.emit({ column: { ...this.column, hidden: !visible } });
    };
  }

  private isAlignmentDisabled(align: Alignment): boolean {
    return align === this.align;
  }
}
