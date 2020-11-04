import { Component, ComponentInterface, Event, EventEmitter, h, JSX, Prop } from '@stencil/core';
import { Alignment, Direction, SortOrder } from '../../../../../shared/types';
import { INC_WIDTH } from '../../core/column';
import { AlignColumnDetail, Column, DataItem, MoveColumnDetail, ResizeColumnDetail, ShowColumnDetail, SortColumnDetail } from '../../core/entities';
import { P6GridActionItem } from '../p6-grid-action-item';

@Component({
  tag: 'p6-grid-header-menu',
  styleUrl: 'p6-grid-header-menu.scss',
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
          <P6GridActionItem icon="chevron-left" clickHandler={this.moveColumnHandler(Direction.left)} />
          <P6GridActionItem icon="sort" clickHandler={this.sortColumnHandler()} />
          <P6GridActionItem icon="chevron-right" clickHandler={this.moveColumnHandler(Direction.right)} />
        </div>
        <div>
          <P6GridActionItem icon="trash-alt" clickHandler={this.showColumnHandler(false)} />
          <P6GridActionItem icon="minus" clickHandler={this.resizeColumnHandler(INC_WIDTH * -1)} />
          <P6GridActionItem icon="plus" clickHandler={this.resizeColumnHandler(INC_WIDTH)} />
        </div>
        <div>
          <P6GridActionItem icon="align-left" clickHandler={this.alignColumnHandler(Alignment.start)} disabled={this.isDefaultAlignment(Alignment.start)} />
          <P6GridActionItem icon="align-center" clickHandler={this.alignColumnHandler(Alignment.center)} disabled={this.isDefaultAlignment(Alignment.center)} />
          <P6GridActionItem icon="align-right" clickHandler={this.alignColumnHandler(Alignment.end)} disabled={this.isDefaultAlignment(Alignment.end)} />
        </div>
      </host>
    );
  }

  private nextSortOrder(): SortOrder {
    if (this.sortOrder === SortOrder.none) {
      return SortOrder.asc;
    }

    if (this.sortOrder === SortOrder.asc) {
      return SortOrder.desc;
    }

    return SortOrder.none;
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
        column: { ...this.column, sortOrder: this.nextSortOrder() },
      });
    };
  }

  private showColumnHandler(visible: boolean): (event: Event) => void {
    return () => {
      this.p6ShowColumn.emit({ column: { ...this.column, hidden: !visible } });
    };
  }

  private isDefaultAlignment(align: Alignment): boolean {
    return align === this.align;
  }
}
