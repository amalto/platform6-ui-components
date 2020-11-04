import { Alignment, Direction, SortOrder } from '../../../../shared/types';
import { throwError } from '../../../../utils/error';
import { Column, ColumnDefinition, ColumnId, DataItem } from './entities';

export const MIN_WIDTH = 75;
export const DEFAULT_WIDTH = MIN_WIDTH;
export const INC_WIDTH = 10;

export function defaultGetValue<T extends DataItem>(data: T, context: ColumnDefinition<T>): string {
  if (context.field === undefined || data[context.field] === undefined) {
    return throwError(`field is undefined or doesn't exist, you should provide a 'getValue' function for ${JSON.stringify(context)}`);
  }

  return `${data[context.field as keyof T]}`;
}

export function defaultSetValue<T extends DataItem>(value: string, data: T, context: ColumnDefinition<T>): T {
  if (context.field === undefined || data[context.field] === undefined) {
    return throwError(`field is undefined or doesn't exist, you should provide a 'setValue' function for ${JSON.stringify(context)}`);
  }

  return {
    ...data,
    [context.field as keyof T]: value,
  };
}

let columnIds = 0;
export function fromDefinition<T extends DataItem>(column: ColumnDefinition<T>): Column<T> {
  // eslint-disable-next-line no-plusplus
  const id = column.id || column.field || columnIds++;

  return {
    ...column,
    id: `col-${id}`,
    editable: column.editable || false,
    hidden: column.hidden || false,
    width: column.width || 100,
    align: column.align || Alignment.center,
    sortOrder: column.sortOrder || SortOrder.none,
    disableHeaderMenu: column.disableHeaderMenu || false,
    getValue: column.getValue || defaultGetValue,
    setValue: column.setValue || defaultSetValue,
  };
}

export function isHidden<T extends DataItem>(column: Column<T>): boolean {
  return !!column.hidden;
}

export function replaceColumn<T extends DataItem>(updatedColumn: Column<T>, allColumns: Column<T>[]): Column<T>[] {
  return allColumns.map(col => (col.id === updatedColumn.id ? updatedColumn : col));
}

export function move<T extends DataItem>(id: ColumnId, direction: Direction, columns: Column<T>[]): Column<T>[] {
  const from = columns.findIndex(col => col.id === id);
  const to = from + (direction === Direction.left ? -1 : 1);

  if (from < 0 || to < 0 || to >= columns.length) {
    return columns;
  }

  const result = columns.slice();
  const item = result.splice(from, 1);

  return result.slice(0, to).concat(item).concat(result.slice(to, columns.length));
}
