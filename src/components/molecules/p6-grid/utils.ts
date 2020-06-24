import { Row, RowCell } from "~shared/interfaces";
import { Order } from "~shared/types";
import { isEmpty } from "~utils/attribute";

const EMPTY_LABEL = "-";

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
