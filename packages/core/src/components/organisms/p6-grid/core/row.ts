import { SortOrder } from '../../../../shared/types';
import { Column, DataItem, Row, RowId } from './entities';

let rowIds = 0;
export function fromData<T extends DataItem>(data: T): Row<T> {
  rowIds += 1;

  return {
    id: `row-${rowIds}`,
    data,
  };
}

export function compareRow<T extends DataItem>(column: Column<T> | undefined): (a: Row<T>, b: Row<T>) => number {
  const sortOrder = column?.sortOrder || SortOrder.none;
  const factor = sortOrder === SortOrder.desc ? -1 : 1;

  return (a: Row<T>, b: Row<T>): number => {
    if (column === undefined || column.sortable === false || sortOrder === SortOrder.none) {
      return 0;
    }

    const valueA = column.getValue(a.data, column);
    const valueB = column.getValue(b.data, column);

    return valueA.localeCompare(valueB) * factor;
  };
}

export function filterBy<T extends DataItem>(searchValue: string, columns: Column<T>[]): (row: Row<T>) => boolean {
  return row => columns.filter(col => col.filtreable !== false).some(col => col.getValue(row.data, col).includes(searchValue));
}

export function rangeSelectRow<T extends DataItem>(currentRowIdSelect: RowId, selectedRows: Set<RowId>, displayedRow: Row<T>[]): Set<RowId> {
  const currentSelectedIndex = displayedRow.findIndex(row => row.id === currentRowIdSelect);

  if (currentSelectedIndex === -1) {
    return selectedRows;
  }

  const previousRowIdSelected = Array.from(selectedRows)
    .reverse()
    .find(rowId => displayedRow.findIndex(row => row.id === rowId) > -1);

  if (previousRowIdSelected === undefined) {
    return new Set(selectedRows.add(currentRowIdSelect));
  }

  const previousSelectedIndex = displayedRow.findIndex(row => row.id === previousRowIdSelected);

  let [from, to] = [previousSelectedIndex, currentSelectedIndex];
  let excludedFromSlice = currentRowIdSelect;
  if (currentSelectedIndex < previousSelectedIndex) {
    [from, to] = [to, from];
    excludedFromSlice = previousRowIdSelected;
  }

  return displayedRow
    .slice(from, to)
    .reduce((selected, cur) => {
      return cur.id === undefined ? selected : selected.add(cur.id);
    }, new Set(selectedRows))
    .add(excludedFromSlice);
}

export function replaceRow<T extends DataItem>(updatedRow: Row<T>, allRows: Row<T>[]): Row<T>[] {
  return allRows.map(row => (row.id === updatedRow.id ? updatedRow : row));
}
