import {
  Component,
  Element,
  h,
  Host,
  Listen,
  Prop,
  State,
} from "@stencil/core";
import { Align, Direction, Operation } from "~shared/types";
import {
  getCellLabelByHeaderId,
  getRowCellByHeaderId,
  HeaderCell,
  RowCell,
  toggleSort,
} from "./utils";

export declare type EventCallBack = (event: MouseEvent) => void;

const MIN_WIDTH = 75;
const DEFAULT_WIDTH = MIN_WIDTH;
const INC_WIDTH = 10;
const DEFAULT_COL = "col-1";

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

  private getHeaderExcept(id: string): HeaderCell[] {
    return this.stateHeaders.filter((header) => header.id !== id);
  }

  @Listen("hide")
  private hide(event: CustomEvent<string>): void {
    this.triggerOnce(() => {
      const id: string = event.detail;
      if (!this.isHeaderUndefined(id)) {
        const header: HeaderCell = this.getHeaderById(id) as HeaderCell;
        const updatedHeader: HeaderCell[] = this.getHeaderExcept(id);

        header.hidden = !header.hidden;
        updatedHeader.push(header);
        this.stateHeaders = updatedHeader;
        this.updateGridCallback(updatedHeader, this.rows);
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
      const isLeft: boolean = direction === "left";
      const isLast: boolean = idx === stateHeaders.length - 1;
      const isFirst: boolean = idx === 0;
      const hasEnoughtItems: boolean = stateHeaders.length > 1;
      const canMoveLeft: boolean = !isFirst || !isLeft;
      const canMoveRight: boolean = !isLast || isLeft;

      if (hasEnoughtItems && canMoveLeft && canMoveRight) {
        for (let i = 0; i < stateHeaders.length; i += 1) {
          if (isLeft) {
            if (i === idx) {
              updatedHeaders.push(stateHeaders[idx - 1]);
            } else if (i !== idx - 1) {
              updatedHeaders.push(stateHeaders[i]);
            } else {
              updatedHeaders.push(stateHeaders[idx]);
            }
          } else if (i === idx) {
            updatedHeaders.push(stateHeaders[idx + 1]);
          } else if (idx !== i - 1) {
            updatedHeaders.push(stateHeaders[i]);
          } else {
            updatedHeaders.push(stateHeaders[idx]);
          }
        }
        this.stateHeaders = updatedHeaders;
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
    const { stateHeaders } = this;
    const lastIndex: number = stateHeaders.length;
    const displayableHeader: HeaderCell[] = stateHeaders.filter(
      (cell) => !cell.hidden
    );
    return (
      <p6-grid-header>
        {displayableHeader.map((header, idx) => (
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
            onMinus={lastIndex === idx ? undefined : this.minus.bind(this)}
            // eslint-disable-next-line react/jsx-no-bind
            onMoveLeft={idx === 0 ? undefined : this.moveLeft.bind(this)}
            // eslint-disable-next-line react/jsx-no-bind
            onMoveRight={
              lastIndex === idx ? undefined : this.moveRight.bind(this)
            }
            // eslint-disable-next-line react/jsx-no-bind
            onPlus={lastIndex === idx ? undefined : this.plus.bind(this)}
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
  ): HTMLP6GridRowElement => {
    const orderedCells: RowCell[] = [];

    orderedHeaders.forEach((id) => {
      orderedCells.push(cells.find((cell) => cell.headerId === id) as RowCell);
    });

    return <p6-grid-row>{orderedCells.map(this.renderRowCell)}</p6-grid-row>;
  };

  private renderRows = (): HTMLP6GridBodyElement | null => {
    const { rows, stateHeaders } = this;

    if (rows.length === 0) {
      return null;
    }

    const orderedHeaders: string[] = stateHeaders
      .filter((header) => !header.hidden)
      .map((header) => header.id);
    const sortedCellds: RowCell[][] = this.sortRows();

    // console.info("sortedCellds => ", sortedCellds);
    const rowsElements: HTMLP6GridRowElement[] = sortedCellds.map((row) => {
      return this.renderRow(row, orderedHeaders);
    });

    return <p6-grid-body>{rowsElements}</p6-grid-body>;
  };

  private sortRows(): RowCell[][] {
    const { sortedBy, stateRows } = this;
    const header: HeaderCell = this.getHeaderById(sortedBy) as HeaderCell;

    return stateRows.sort((a, b) => {
      const cellA: RowCell = getRowCellByHeaderId(sortedBy, a) as RowCell;
      const cellB: RowCell = getRowCellByHeaderId(sortedBy, b) as RowCell;
      const vA: string = getCellLabelByHeaderId(
        cellA.headerId,
        sortedBy,
        cellA.label
      );
      const vB: string = getCellLabelByHeaderId(
        cellB.headerId,
        sortedBy,
        cellB.label
      );

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
        <div>
          <p6-button mode="danger" size="small" type="button">
            <p6-icon name="eraser" />
          </p6-button>
        </div>
        {this.renderHeader()}
        {this.renderRows()}
        <slot />
      </Host>
    );
  }
}
