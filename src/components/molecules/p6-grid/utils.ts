import { Align, Order } from "~shared/types";
import { isEmpty } from "~utils/attribute";

const EMPTY_LABEL = "-";

export interface Cell {
  align?: Align;
  color?: string;
  label: string;
  width?: number;
}

export interface HeaderCell extends Cell {
  id: string;
  hidden?: boolean;
  movable?: string;
  selected?: boolean;
  sort?: Order;
}

export interface Row {
  cells: RowCell[];
  selected?: boolean;
}

export interface RowCell extends Cell {
  headerId: string;
}

export function clearSelection(): void {
  window?.getSelection()?.removeAllRanges();
  document?.getSelection()?.empty();
}

export function getRowCellByHeaderId(
  headerId: string,
  cells: RowCell[]
): RowCell | undefined {
  return cells.find((cell) => cell.headerId === headerId);
}

export function getCellLabelByHeaderId(
  cellId: string,
  headerId: string,
  label: string
): string {
  const calculatedLabel: string = isEmpty(label) ? EMPTY_LABEL : label;
  return cellId === headerId ? calculatedLabel : EMPTY_LABEL;
}

export function isRowSelected(row: Row): boolean {
  return row.selected || false;
}

export function toggleSort(sort: Order): Order {
  return sort === "asc" ? "desc" : "asc";
}
