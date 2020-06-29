import { Align, Order } from "./types";

export interface Cell {
  align?: Align;
  color?: string;
  edit?: boolean;
  editable?: boolean;
  label: string;
  width?: number;
}

export interface HeaderCell extends Cell {
  id: string;
  disabled?: boolean;
  hidden?: boolean;
  selected?: boolean;
  sort?: Order;
}

export interface RowCell extends Cell {
  headerId: string;
}

export interface Row {
  cells: RowCell[];
  selected?: boolean;
}
