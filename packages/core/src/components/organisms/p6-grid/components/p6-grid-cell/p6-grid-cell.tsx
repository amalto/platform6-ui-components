import { Component, ComponentInterface, Element, h, Host, JSX, Listen, Prop } from '@stencil/core';
import { Alignment } from '../../../../../shared/types';
import { toWidth } from '../../../../../utils/css';
import { DEFAULT_WIDTH } from '../../core/column';
import { Column, DataItem, EditingCellDetail, EditingCellStatus, Row } from '../../core/entities';

@Component({
  tag: 'p6-grid-cell',
  styleUrl: 'p6-grid-cell.scss',
  scoped: true,
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

  @Listen('p6GridEditingCell')
  onP6GridEditingCell(event: CustomEvent<EditingCellDetail<DataItem>>): void {
    if (event.detail.status !== EditingCellStatus.Start) {
      this.editing = false;
    }
  }

  componentWillLoad(): void {
    this.host.addEventListener('dblclick', () => {
      if (this.editable) {
        this.editing = true;
      }
    });
  }

  render(): JSX.Element {
    const { align, color, width } = this;
    const styles = {
      color,
      justifyContent: Alignment[align],
      width: toWidth(width),
      flex: width === DEFAULT_WIDTH ? 'initial' : 'none',
    };

    const classes = {
      'is-editing': this.editing,
    };

    const content = this.cellContentRender(this.host);

    return content !== null ? (
      <Host class={classes} style={styles}>
        {content}
      </Host>
    ) : (
      <Host class={classes} style={styles} />
    );
  }

  private cellContentRender(parentNode: Element | null) {
    if (this.editing) {
      return this.column.cellEditor !== undefined ? (
        this.column.cellEditor(this.row.data, this.column)
      ) : (
        <p6-grid-textarea-cell-editor row={this.row} value={this.column.getValue(this.row.data, this.column)} column={this.column} />
      );
    }

    if (this.column.cellRenderer === undefined) {
      return this.column.getValue(this.row.data, this.column);
    }

    const cellContent = this.column.cellRenderer(this.row.data, this.row.id, this.column);
    if (typeof cellContent === 'string' || '$tag$' in cellContent) {
      return cellContent;
    }
    if (parentNode !== null) {
      const child = this.host.firstChild;

      if (child === null) {
        parentNode.appendChild(cellContent);
      } else {
        parentNode.replaceChild(cellContent, child);
      }
    }

    return null;
  }
}
