import { Align, Order } from "./types";

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

export interface RowCell extends Cell {
  headerId: string;
}

export interface Row {
  cells: RowCell[];
  selected?: boolean;
}
