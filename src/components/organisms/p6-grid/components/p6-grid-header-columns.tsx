import { h } from '@stencil/core';
import { Column, DataItem } from '../core/entities';

export function P6GridHeaderColumns(props: { columnsToDisplay: Column<DataItem>[] }): HTMLP6GridHeaderElement {
  // eslint-disable-next-line react/destructuring-assignment
  const cells = props.columnsToDisplay.map(column => (
    <p6-grid-header-cell key={`header:col-${column.id}`} column={column} width={column.width} disabled={column.disableHeaderMenu} sortOrder={column.sortOrder}>
      {column.label}
    </p6-grid-header-cell>
  ));
  return <p6-grid-header>{cells}</p6-grid-header>;
}
