import { HeaderCell, Row, RowCell } from "~shared/grid";
import { Direction, Order } from "~shared/types";
import { isEmpty } from "~utils/attribute";

const EMPTY_LABEL = "-";

export function clearSelection(): void {
  window?.getSelection()?.removeAllRanges();
  document?.getSelection()?.empty();
}

export function filterBySearchInput(searchValue: string, rows: Row[]): Row[] {
  const updatedRows: Row[] = [];

  rows.forEach((row) => {
    const containSearchValue: boolean = row.cells.some((cell) => {
      return cell.label.indexOf(searchValue) !== -1;
    });

    if (containSearchValue) {
      updatedRows.push(row);
    }
  });
  return updatedRows;
}

export function getCellLabelByHeaderId(
  cellId: string,
  headerId: string,
  label: string
): string {
  const calculatedLabel: string = isEmpty(label) ? EMPTY_LABEL : label;
  return cellId === headerId ? calculatedLabel : EMPTY_LABEL;
}

export function getHeaderExcept(
  id: string,
  headers: HeaderCell[]
): HeaderCell[] {
  return headers.filter((header) => header.id !== id);
}

export function getHeaderCellById(
  id: string,
  cells: Array<HeaderCell>
): HeaderCell {
  const foundCell = cells.find((cell) => cell.id === id);

  if (typeof foundCell === "undefined") {
    throw new Error(
      `getHeaderCellById: the header with id ${id} desn't exist!`
    );
  } else {
    return foundCell;
  }
}

export function getRowCellById(
  headerId: string,
  cells: Array<RowCell>
): RowCell {
  const foundCell = cells.find((cell) => cell.headerId === headerId);

  if (typeof foundCell === "undefined") {
    throw new Error(
      `getRowCellById: the cell with header id ${headerId} doesn't exist!`
    );
  } else {
    return foundCell;
  }
}

export function getHeaderIdxById(id: string, headers: HeaderCell[]): number {
  return headers.findIndex((header) => header.id === id);
}

export function isArrayEmpty(array: unknown[] = []): boolean {
  return array.length === 0;
}

export function isLastInArray(idx: number, array: unknown[] = []): boolean {
  return idx === array.length - 1;
}

export function isLeft(direction: Direction): boolean {
  return direction === "left";
}

export function canMoveLeft(
  idx: number,
  direction: Direction,
  headers: HeaderCell[]
): boolean {
  return idx !== 0 && isLeft(direction) && !headers[idx - 1]?.disabled;
}

export function canMoveRight(
  idx: number,
  direction: Direction,
  headers: HeaderCell[]
): boolean {
  return (
    !isLastInArray(idx, headers) &&
    !isLeft(direction) &&
    !headers[idx + 1]?.disabled
  );
}

export function isRowSelected(row: Row): boolean {
  return row.selected || false;
}

export function toggleSort(sort: Order): Order {
  return sort === "asc" ? "desc" : "asc";
}

export function updateHeaderAttr(
  id: string,
  attrName: string,
  attr: unknown,
  headers: HeaderCell[]
): HeaderCell[] {
  return headers.map((header) => {
    if (header.id === id) {
      return {
        ...header,
        [attrName]: attr,
      };
    }
    return header;
  });
}
