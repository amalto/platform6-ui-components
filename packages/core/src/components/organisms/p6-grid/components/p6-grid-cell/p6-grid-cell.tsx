import { Component, ComponentInterface, Element, h, Host, Listen, Prop, State } from '@stencil/core';
import { Alignment } from '../../../../../shared/types';
import { toWidth } from '../../../../../utils/css';
import { DEFAULT_WIDTH } from '../../core/column';
import { Column, DataItem, EditingCellDetail, EditingCellStatus, Row } from '../../core/entities';

@Component({
  tag: 'p6-grid-cell',
  styleUrl: 'p6-grid-cell.scss',
  shadow: true,
})
export class P6GridCell implements ComponentInterface {
  @Element() host!: HTMLP6GridCellElement;

  /**
   * Cell column
   */
  @Prop() column!: Column<DataItem>;

  /**
   * Cell line
   */
  @Prop() row!: Row<DataItem>;

  /**
   * Cell alignment
   */
  @Prop() align: Alignment = Alignment.start;

  /**
   * Cell text color
   */
  @Prop() color: string | undefined;

  /**
   * Cell width
   */
  @Prop() width: number | string = DEFAULT_WIDTH;

  /**
   * Set to true if this cell is editable, otherwise false
   */
  @Prop() editable = false;

  /**
   * Set to true if this cell is being edited
   */
  // eslint-disable-next-line @stencil/strict-mutable
  @Prop({ mutable: true }) editing = false;

  @State() isEditing = false;

  @Listen('p6GridEditingCell')
  onP6GridEditingCell(event: CustomEvent<EditingCellDetail<DataItem>>): void {
    if (event.detail.status !== EditingCellStatus.Start) {
      this.isEditing = false;
    }
  }

  componentWillLoad(): void {
    this.host.addEventListener('dblclick', () => {
      if (this.editable) {
        this.isEditing = true;
      }
    });
  }

  render(): JSX.Element {
    const { align, color, width } = this;
    const styles = {
      color,
      justifyContent: Alignment[align],
      width: toWidth(width),
    };
    const classes = {
      'is-editing': this.isEditing,
    };

    return (
      <Host class={classes} style={styles}>
        {this.isEditing ? this.getCellEditor(this.row, this.column) : <slot />}
      </Host>
    );
  }

  // eslint-disable-next-line class-methods-use-this
  private getCellEditor(row: Row<DataItem>, column: Column<DataItem>) {
    return column.cellEditor !== undefined ? (
      column.cellEditor(row.data, column)
    ) : (
      <p6-grid-textarea-cell-editor row={row} value={column.getValue(row.data, column)} column={column} />
    );
  }
}
