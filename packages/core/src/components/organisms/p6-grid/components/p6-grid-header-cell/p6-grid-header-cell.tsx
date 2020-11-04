import { Component, ComponentInterface, h, Host, JSX, Prop } from '@stencil/core';
import { SortOrder } from '../../../../../shared/types';
import { toWidth } from '../../../../../utils/css';
import { DEFAULT_WIDTH } from '../../core/column';
import { Column, DataItem } from '../../core/entities';
import { P6GridSortMarker } from '../p6-grid-sort-marker';

@Component({
  tag: 'p6-grid-header-cell',
  styleUrl: 'p6-grid-header-cell.scss',
  shadow: true,
})
export class P6GridHeaderCell implements ComponentInterface {
  /**
   * the column
   */
  @Prop() column!: Column<DataItem>;

  /**
   * Cell width
   */
  @Prop() width: number | string = DEFAULT_WIDTH;

  /**
   * Disabled templating
   */
  @Prop() disabled = false;

  /**
   * Displays the sort order of this column
   */
  @Prop() sortOrder: SortOrder = SortOrder.none;

  render(): JSX.Element {
    const { disabled, width } = this;
    const styles = {
      width: toWidth(width),
      flex: width === DEFAULT_WIDTH ? 'initial' : 'none',
    };

    return (
      <Host style={styles}>
        <div class="wrapper">
          <div class="label">
            <P6GridSortMarker order={this.sortOrder} />
            <slot />
          </div>
          {!disabled ? <p6-grid-header-menu class="grid-cell-context-menu" align={this.column.align} sortOrder={this.sortOrder} column={this.column} /> : null}
        </div>
      </Host>
    );
  }
}
