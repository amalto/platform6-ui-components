import { h } from '@stencil/core';
import { Column, DataItem, Row } from '../core/entities';

export function P6GridRowCells(props: { row: Row<DataItem>; columnsToDisplay: Column<DataItem>[] }): HTMLP6GridCellElement[] {
  return props.columnsToDisplay.map(column => {
    return (
      <p6-grid-cell
        key={`row-${props.row.id}:col-${column.id}`}
        row={props.row}
        column={column}
        align={column.align}
        color={column.color}
        width={column.width}
        editable={column.editable}
      >
        {column.getValue(props.row.data, column)}
      </p6-grid-cell>
    );
  });
}
