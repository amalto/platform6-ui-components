import { EventEmitter, JSX } from '@stencil/core';
import { Alignment, Direction, SortOrder } from '../../../../shared/types';

export type ColumnId = string;

export type DataItem = Record<string, unknown>;

export interface ColumnDefinition<T extends DataItem> {
  id?: ColumnId;
  label: string;
  field?: string | keyof T;
  editable?: boolean;
  filtreable?: boolean;
  sortable?: boolean;
  hidden?: boolean;
  width?: number;
  align?: Alignment;
  color?: string;
  sortOrder?: SortOrder;
  disableHeaderMenu?: boolean;
  getValue?: (data: T, context: ColumnDefinition<T>) => string;
  setValue?: (value: string, data: T, context: ColumnDefinition<T>) => T;
  cellEditor?: (data: T, context: ColumnDefinition<T>) => JSX.Element & CellEditor<T>;
  cellRenderer?: (data: T, rowId: RowId, context: ColumnDefinition<T>) => string | HTMLElement;
}

export interface Column<T extends DataItem> extends ColumnDefinition<T> {
  id: ColumnId;
  editable: boolean;
  hidden: boolean;
  width: number;
  align: Alignment;
  sortOrder: SortOrder;
  disableHeaderMenu: boolean;
  getValue: (data: T, context: ColumnDefinition<T>) => string;
  setValue: (value: string, data: T, context: ColumnDefinition<T>) => T;
}

export interface CellEditor<T extends DataItem> {
  column: Column<T>;
  row: Row<T>;
  value: string;

  p6GridCellValueChanged: EventEmitter<CellValueChangedDetail<T>>;
  p6GridEditingCell: EventEmitter<EditingCellDetail<T>>;
}
export type RowId = string;

export interface Row<T extends DataItem> {
  id: RowId;
  data: T;
}

interface ColumnEventDetail<T extends DataItem> {
  column: Column<T>;
}

export interface MoveColumnDetail<T extends DataItem> extends ColumnEventDetail<T> {
  direction: Direction;
}
export type ResizeColumnDetail<T extends DataItem> = ColumnEventDetail<T>;

export type AlignColumnDetail<T extends DataItem> = ColumnEventDetail<T>;

export type SortColumnDetail<T extends DataItem> = ColumnEventDetail<T>;

export type ShowColumnDetail<T extends DataItem> = ColumnEventDetail<T>;

export interface CellValueChangedDetail<T extends DataItem> {
  column: Column<T>;
  row: Row<T>;
  oldValue: string;
}

export enum EditingCellStatus {
  Start,
  Stop,
  Cancel,
}

export interface EditingCellDetail<T extends DataItem> {
  column: Column<T>;
  row: Row<T>;
  status: EditingCellStatus;
}

export interface ResetDefinitionsDetail {
  reset: boolean;
}

export interface ShowOptionsDetail {
  visible: boolean;
}

export interface FilterRowsDetail {
  value: string;
}
