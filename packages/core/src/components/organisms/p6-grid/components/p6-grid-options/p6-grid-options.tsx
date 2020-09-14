import { Component, Element, Event, EventEmitter, h, Host, JSX, Prop } from '@stencil/core';
import { isHidden } from '../../core/column';
import { Column, DataItem, ShowColumnDetail } from '../../core/entities';

@Component({
  tag: 'p6-grid-options',
  styleUrl: 'p6-grid-options.scss',
  shadow: true,
})
export class P6GridOptions {
  @Element() host!: HTMLP6GridOptionsElement;

  /**
   * List of grid columns
   */
  @Prop() columns!: Column<DataItem>[];

  /**
   * Update the visibility of the column
   */
  @Event() p6ShowColumn!: EventEmitter<ShowColumnDetail<DataItem>>;

  render(): JSX.Element {
    const hiddenColumns = this.columns.filter(isHidden);

    return (
      <Host>
        <div>{this.host.title}</div>
        {hiddenColumns.map(this.renderHiddenTag)}
      </Host>
    );
  }

  private renderHiddenTag = (column: Column<DataItem>, index: number): JSX.Element => {
    return (
      <p6-tag data-id={column.id} onMouseUp={this.showColumn(column)} role="button" tabIndex={index}>
        {column.label}
      </p6-tag>
    );
  };

  private showColumn(column: Column<DataItem>): (event: MouseEvent) => void {
    return (event: MouseEvent) => {
      event.preventDefault();
      event.stopImmediatePropagation();

      this.p6ShowColumn.emit({ column: { ...column, hidden: false } });
    };
  }
}
