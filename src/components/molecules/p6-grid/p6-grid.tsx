import {
  Component,
  Element,
  h,
  Host,
  Listen,
  Prop,
  State,
} from "@stencil/core";
import { Align, Direction, Operation, Order } from "~shared/types";
import { toggleSort } from "./utils";

export declare type EventCallBack = (event: MouseEvent) => void;

const MIN_WIDTH = 75;
const DEFAULT_WIDTH = MIN_WIDTH;
const INC_WIDTH = 10;
const DEFAULT_COL = "col-1";

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
  sort?: Order;
}

export interface RowCell extends Cell {
  headerId: string;
}

@Component({
  tag: "p6-grid",
  styleUrl: "p6-grid.scss",
  shadow: true,
})
export class P6Tables {
  @Element() host!: HTMLP6GridElement;

  /**
   * Grid headers
   */
  @Prop() headers!: HeaderCell[];

  /**
   * Grid rows
   */
  @Prop() rows!: RowCell[][];

  /**
   * Update callback after each action on the grid
   */
  @Prop() updateGridCallback!: (
    header: HeaderCell[],
    rows: RowCell[][]
  ) => void;

  @State() sortedBy = DEFAULT_COL;

  @State() stateHeaders: HeaderCell[] = [];

  @State() stateRows: RowCell[][] = [];

  private clearTimeout: NodeJS.Timeout | undefined;

  private align = (id: string, align: Align): void => {
    this.updateGridCallback(
      this.updateHeaderAttr(id, "align", align),
      this.rows
    );
  };

  /**
   * Workaround until we find out why the listner is triggered 2 times.
   * @param method
   */
  private triggerOnce(method: () => void): void {
    if (!this.clearTimeout) {
      this.clearTimeout = setTimeout(() => {
        method();
        clearTimeout(this.clearTimeout as NodeJS.Timeout);
        this.clearTimeout = undefined;
      }, 100);
    }
  }

  @Listen("alignLeft")
  private alignLeft(event: CustomEvent<string>): void {
    this.triggerOnce(() => this.align(event.detail, "start"));
  }

  @Listen("alignCenter")
  private alignCenter(event: CustomEvent<string>): void {
    this.triggerOnce(() => this.align(event.detail, "center"));
  }

  @Listen("alignRight")
  private alignRight(event: CustomEvent<string>): void {
    this.triggerOnce(() => this.align(event.detail, "end"));
  }

  private calcOrder(id: string, operation: Operation): void {
    if (!this.isHeaderUndefined(id)) {
      const header: HeaderCell = this.getHeaderById(id) as HeaderCell;
      const width: number = header.width || DEFAULT_WIDTH;
      const minWidth: number =
        width - INC_WIDTH < MIN_WIDTH ? MIN_WIDTH : width - INC_WIDTH;
      const newWidth: number =
        operation === "minus" ? minWidth : width + INC_WIDTH;
      this.updateGridCallback(
        this.updateHeaderAttr(id, "width", newWidth),
        this.rows
      );
    }
  }

  private getHeaderById(id: string): HeaderCell | undefined {
    return this.stateHeaders.find((header) => header.id === id);
  }

  @Listen("hide")
  private hide(event: CustomEvent<string>): void {
    this.triggerOnce(() => {
      const id: string = event.detail;
      if (!this.isHeaderUndefined(id)) {
        const header: HeaderCell = this.getHeaderById(id) as HeaderCell;
        this.updateGridCallback(
          this.updateHeaderAttr(id, "header", !header.hidden),
          this.rows
        );
      }
    });
  }

  private isHeaderUndefined(id: string): boolean {
    const isUndefined = !this.getHeaderById(id);

    if (isUndefined) {
      // eslint-disable-next-line no-console
      console.warn(`Header with id ${id} doesn't exist!`);
    }
    return isUndefined;
  }

  @Listen("minus")
  private minus(event: CustomEvent<string>): void {
    this.triggerOnce(() => this.calcOrder(event.detail, "minus"));
  }

  private move(id: string, direction: Direction): void {
    if (!this.isHeaderUndefined(id)) {
      const { stateHeaders } = this;
      const updatedHeaders: HeaderCell[] = [];
      const idx: number = stateHeaders.findIndex((header) => header.id === id);

      if (
        (idx === 0 && direction === "left") ||
        (idx === stateHeaders.length && direction === "right")
      ) {
        this.updateGridCallback(stateHeaders, this.rows);
      } else {
        for (let i = 0; i < stateHeaders.length; i += 1) {
          if (i !== idx) {
            const shouldAddIdx: boolean =
              direction === "left" ? i === idx - 1 : idx === i - 1;

            if (shouldAddIdx) {
              updatedHeaders.push(stateHeaders[idx]);
            }
            updatedHeaders.push(stateHeaders[i]);
          }
        }
      }
    }
  }

  @Listen("moveLeft")
  private moveLeft(event: CustomEvent<string>): void {
    this.triggerOnce(() => this.move(event.detail, "left"));
  }

  @Listen("moveRight")
  private moveRight(event: CustomEvent<string>): void {
    this.triggerOnce(() => this.move(event.detail, "right"));
  }

  @Listen("plus")
  private plus(event: CustomEvent<string>): void {
    this.triggerOnce(() => this.calcOrder(event.detail, "plus"));
  }

  @Listen("sort")
  private sort(event: CustomEvent<string>): void {
    this.triggerOnce(() => {
      const id: string = event.detail;
      if (!this.isHeaderUndefined(id)) {
        const { stateHeaders } = this;
        const idx: number = stateHeaders.findIndex(
          (header) => header.id === id
        );
        const updatedHeaders: HeaderCell[] = [...stateHeaders];

        updatedHeaders[idx].sort = toggleSort(
          updatedHeaders[idx].sort || "asc"
        );
        this.stateHeaders = updatedHeaders;
        this.sortedBy = id;
        this.updateGridCallback(updatedHeaders, this.rows);
      }
    });
  }

  @Listen("setColor")
  private setColor(event: CustomEvent<string>): void {
    this.triggerOnce(() => {
      const id: string = event.detail;
      // eslint-disable-next-line no-console
      console.info("id => ", id);
      this.updateGridCallback(this.stateHeaders, this.rows);
    });
  }

  private updateHeaderAttr(
    id: string,
    attrName: string,
    attr: unknown
  ): HeaderCell[] {
    const { stateHeaders } = this;
    this.stateHeaders = stateHeaders.map((header) => {
      if (header.id === id) {
        return {
          ...header,
          [attrName]: attr,
        };
      }
      return header;
    });
    return this.stateHeaders;
  }

  private renderHeader(): HTMLP6GridHeaderElement {
    return (
      <p6-grid-header>
        {this.stateHeaders.map((header) => (
          <p6-grid-cell
            // eslint-disable-next-line react/jsx-no-bind
            onAlignLeft={this.alignLeft.bind(this)}
            // eslint-disable-next-line react/jsx-no-bind
            onAlignCenter={this.alignCenter.bind(this)}
            // eslint-disable-next-line react/jsx-no-bind
            onAlignRight={this.alignRight.bind(this)}
            color={header.color}
            headerId={header.id}
            // eslint-disable-next-line react/jsx-no-bind
            onHide={this.hide.bind(this)}
            // eslint-disable-next-line react/jsx-no-bind
            onMinus={this.minus.bind(this)}
            // eslint-disable-next-line react/jsx-no-bind
            onMoveLeft={this.moveLeft.bind(this)}
            // eslint-disable-next-line react/jsx-no-bind
            onMoveRight={this.moveRight.bind(this)}
            // eslint-disable-next-line react/jsx-no-bind
            onPlus={this.plus.bind(this)}
            // eslint-disable-next-line react/jsx-no-bind
            onSort={this.sort.bind(this)}
            // eslint-disable-next-line react/jsx-no-bind
            onSetColor={this.setColor.bind(this)}
            width={header.width}
          >
            {header.label}
          </p6-grid-cell>
        ))}
      </p6-grid-header>
    );
  }

  private renderRowCell = (cell: RowCell): HTMLP6GridCellElement => {
    const header: HeaderCell = this.getHeaderById(cell.headerId) as HeaderCell;
    return (
      <p6-grid-cell
        align={header.align}
        color={header.color}
        headerId={cell.headerId}
        width={header.width}
      >
        {cell.label}
      </p6-grid-cell>
    );
  };

  private renderRow = (
    cells: RowCell[],
    orderedHeaders: string[]
  ): HTMLP6GridCellElement[] => {
    const orderedCells: RowCell[] = [];

    orderedHeaders.forEach((id) => {
      orderedCells.push(cells.find((cell) => cell.headerId === id) as RowCell);
    });

    return <p6-grid-row>{cells.map(this.renderRowCell)}</p6-grid-row>;
  };

  private renderRows = (): HTMLP6GridRowElement[][] | null => {
    const { stateHeaders } = this;

    if (this.rows.length === 0) {
      return null;
    }

    const orderedHeaders: string[] = stateHeaders.map((header) => header.id);
    const sortedCellds: RowCell[][] = this.sortRows();

    console.info("sortedCellds => ", sortedCellds);

    return (
      <p6-grid-body>
        {sortedCellds.map((row) => {
          return this.renderRow(row, orderedHeaders);
        })}
      </p6-grid-body>
    );
  };

  private sortRows(): RowCell[][] {
    const { sortedBy } = this;
    const header: HeaderCell = this.getHeaderById(sortedBy) as HeaderCell;

    return this.stateRows.sort((a, b) => {
      const cellA: RowCell = a.find(
        (cell) => cell.headerId === header.id
      ) as RowCell;
      const cellB: RowCell = b.find(
        (cell) => cell.headerId === header.id
      ) as RowCell;
      const vA: string = cellA.headerId === sortedBy ? cellA.label : "";
      const vB: string = cellB.headerId === sortedBy ? cellB.label : "";

      console.info("a => ", a);
      console.info("b => ", b);

      return header.sort === "desc"
        ? vB.localeCompare(vA)
        : vA.localeCompare(vB);
    });
  }

  componentWillLoad(): void {
    this.stateHeaders = this.headers;
    this.stateRows = this.rows;
  }

  render(): JSX.Element {
    return (
      <Host>
        {this.renderHeader()}
        {this.renderRows()}
        <slot />
      </Host>
    );
  }
}
