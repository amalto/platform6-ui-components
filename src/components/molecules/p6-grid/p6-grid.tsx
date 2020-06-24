import { library } from "@fortawesome/fontawesome-svg-core";
import { faEraser, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import {
  Component,
  Element,
  h,
  Host,
  Listen,
  Prop,
  State,
} from "@stencil/core";
import { HeaderCell, Row, RowCell } from "~shared/interfaces";
import { Align, Direction, Operation } from "~shared/types";
import { isEmpty } from "~utils/attribute";
import { getL10n, L10n } from "~utils/translations";
import {
  clearSelection,
  getCellLabelByHeaderId,
  getRowCellByHeaderId,
  isRowSelected,
  toggleSort,
} from "./utils";

export declare type EventCallBack = (event: MouseEvent) => void;
export declare type ContextMenuFunction = (row: RowCell[]) => Element;

library.add(faEraser, faEyeSlash);

const MIN_WIDTH = 75;
const DEFAULT_WIDTH = MIN_WIDTH;
const INC_WIDTH = 10;
const DEFAULT_COL = "col-1";

@Component({
  tag: "p6-grid",
  styleUrl: "p6-grid.scss",
  assetsDir: "locales",
  shadow: true,
})
export class P6Tables {
  @Element() host!: HTMLP6GridElement;

  /**
   * Display a context menu based on row data
   */
  @Prop() customContextMenu: ContextMenuFunction | undefined = undefined;

  /**
   * Grid headers
   */
  @Prop() headers!: HeaderCell[];

  /**
   * Grid rows
   */
  @Prop() rows!: Row[];

  /**
   * Update callback after each action on the grid
   */
  @Prop() updateGridCallback!: (header: HeaderCell[], rows: Row[]) => void;

  @State() displayTags = false;

  @State() isContextMenuOpen = false;

  @State() rowContext: RowCell[] = [];

  @State() sortedBy = DEFAULT_COL;

  @State() stateHeaders: HeaderCell[] = [];

  @State() stateRows: Row[] = [];

  private clearTimeout: NodeJS.Timeout | undefined;

  private l10n: L10n | undefined;

  private contextMenu: HTMLDivElement | null = null;

  private align = (id: string, align: Align): void => {
    this.updateGridCallback(
      this.updateHeaderAttr(id, "align", align),
      this.rows
    );
  };

  private appendSelectedRow(rowIdx: number): Row[] {
    return this.stateRows.map((row, idx) => ({
      ...row,
      selected: rowIdx === idx ? !row.selected : row.selected,
    }));
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
        this.stateRows
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
        this.toggleHide(id);
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

  private moveContextMenu(posX: number, posY: number): void {
    if (!this.isContextMenuOpen) {
      document.addEventListener("click", this.onCloseContextMenu.bind(this), {
        once: true,
      });
      this.isContextMenuOpen = true;
    }
    if (this.contextMenu) {
      this.contextMenu.style.left = `${posX}px`;
      this.contextMenu.style.top = `${posY}px`;
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

  private multipleSelectedRow(rowIdx: number): Row[] {
    const { stateRows } = this;
    const firstSelected: number = stateRows.findIndex((row) => !!row.selected);
    const lastSelected: number = stateRows.reduce((prev, cur, idx) => {
      return cur.selected ? idx : prev;
    }, -1);

    if (firstSelected === -1) {
      return this.selectSingleRow(rowIdx);
    }
    const beforeFirstSelected: boolean = rowIdx <= firstSelected;
    const afterLastSelected: boolean = rowIdx > lastSelected;

    return stateRows.map((row, idx) => {
      const afterLastCondition: boolean = afterLastSelected
        ? idx <= rowIdx
        : !!row.selected;
      const selected: boolean = beforeFirstSelected
        ? idx >= rowIdx && idx <= firstSelected
        : afterLastCondition;

      return {
        ...row,
        selected,
      };
    });
  }

  private onCloseContextMenu(): void {
    this.isContextMenuOpen = false;
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
        this.updateGridCallback(updatedHeaders, this.stateRows);
      }
    });
  }

  @Listen("setColor")
  private setColor(event: CustomEvent<string>): void {
    this.triggerOnce(() => {
      const id: string = event.detail;
      // eslint-disable-next-line no-console
      console.info("id => ", id);
      this.updateGridCallback(this.stateHeaders, this.stateRows);
    });
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
    rowId: number,
    row: Row,
    orderedHeaders: string[]
  ): HTMLP6GridRowElement => {
    const orderedCells: RowCell[] = [];

    orderedHeaders.forEach((id) => {
      orderedCells.push(
        row.cells.find((cell) => cell.headerId === id) as RowCell
      );
    });

    return (
      <p6-grid-row
        // eslint-disable-next-line react/jsx-no-bind
        contextMenuCallback={() => {
          this.setRowContextMenu(row);
        }}
        data-row-idx={rowId.toString()}
        key={`${this.host.id}-row-${rowId}`}
        // eslint-disable-next-line react/jsx-no-bind
        onClick={this.selectRow.bind(this)}
        // eslint-disable-next-line react/jsx-no-bind
        moveContextMenu={this.moveContextMenu.bind(this)}
        selected={isRowSelected(row)}
      >
        {orderedCells.map(this.renderRowCell)}
      </p6-grid-row>
    );
  };

  private renderRows = (): HTMLP6GridBodyElement | null => {
    const { rows, stateHeaders } = this;

    if (rows.length === 0) {
      return null;
    }

    const orderedHeaders: string[] = stateHeaders
      .filter((header) => !header.hidden)
      .map((header) => header.id);
    const sortedCellds: Row[] = this.sortRows();
    const rowsElements: HTMLP6GridRowElement[] = sortedCellds.map(
      (row, idx) => {
        return this.renderRow(idx, row, orderedHeaders);
      }
    );

    return <p6-grid-body>{rowsElements}</p6-grid-body>;
  };

  private renderConfigHeader(): JSX.Element {
    return (
      <div class="btn-bar">
        <p6-button
          mode="info"
          // eslint-disable-next-line react/jsx-no-bind
          onClick={this.toggleDisplayTags.bind(this)}
          outlined
          size="small"
          type="button"
        >
          <p6-icon name="eye-slash" />
        </p6-button>
        <p6-button
          mode="danger"
          // eslint-disable-next-line react/jsx-no-bind
          onClick={this.resetGrid.bind(this)}
          outlined
          size="small"
          type="button"
        >
          <p6-icon name="eraser" />
        </p6-button>
      </div>
    );
  }

  private renderContextMenu(): JSX.Element {
    const contextMenu: Element | undefined =
      this.rowContext &&
      this.customContextMenu &&
      this.customContextMenu(this.rowContext);
    return (
      <div
        class={`row-context-menu ${
          this.isContextMenuOpen ? "is-open" : undefined
        }`}
        ref={(dom) => {
          if (dom) {
            this.contextMenu = dom;
          }
        }}
      >
        {contextMenu}
      </div>
    );
  }

  private renderHiddenColumnsPanel(): JSX.Element | undefined {
    if (!this.displayTags) {
      return undefined;
    }
    const hiddenColumns: HeaderCell[] = this.stateHeaders.filter(
      (header) => header.hidden
    );
    return (
      <div class="hidden-column-panel">
        <div>{this.l10n?.hideColumn}</div>
        {hiddenColumns.map((header, idx) => (
          <span
            class="tag"
            data-header-id={header.id}
            // eslint-disable-next-line react/jsx-no-bind
            onMouseUp={this.toogleDisplayColumn.bind(this)}
            role="button"
            tabIndex={idx}
          >
            {header.label}
          </span>
        ))}
      </div>
    );
  }

  private resetGrid(): void {
    const { headers } = this;

    this.stateHeaders = headers.map((header) => ({
      ...header,
      hidden: false,
    }));
    this.displayTags = false;
    this.updateGridCallback(this.stateHeaders, this.stateRows);
  }

  private setRowContextMenu(row: Row): void {
    this.rowContext = row.cells;
  }

  private selectSingleRow(rowIdx: number): Row[] {
    return this.stateRows.map((row, idx) => ({
      ...row,
      selected: rowIdx === idx ? !row.selected : false,
    }));
  }

  private selectRow(event: MouseEvent): void {
    const dataRowIdx:
      | string
      | null = (event.currentTarget as HTMLP6GridRowElement).getAttribute(
      "data-row-idx"
    );

    if (!isEmpty(dataRowIdx)) {
      const rowIdx: number = parseInt(dataRowIdx as string, 10);

      if (event.metaKey || event.ctrlKey) {
        this.stateRows = this.appendSelectedRow(rowIdx);
      } else if (event.shiftKey) {
        this.stateRows = this.multipleSelectedRow(rowIdx);
        clearSelection();
      } else {
        this.stateRows = this.selectSingleRow(rowIdx);
      }
      this.updateGridCallback(this.stateHeaders, this.stateRows);
    }
  }

  private sortRows(): Row[] {
    const { sortedBy, stateRows } = this;
    const header: HeaderCell = this.getHeaderById(sortedBy) as HeaderCell;

    return stateRows.sort((a, b) => {
      const cellA: RowCell = getRowCellByHeaderId(sortedBy, a.cells) as RowCell;
      const cellB: RowCell = getRowCellByHeaderId(sortedBy, b.cells) as RowCell;
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

  private toogleDisplayColumn(event: MouseEvent): void {
    const id: string = (event.target as HTMLSpanElement).getAttribute(
      "data-header-id"
    ) as string;
    this.toggleHide(id);
  }

  private toggleDisplayTags(): void {
    this.displayTags = !this.displayTags;
  }

  private toggleHide(id: string): void {
    const header: HeaderCell = this.getHeaderById(id) as HeaderCell;
    const updatedHeader: HeaderCell[] = this.getHeaderExcept(id);
    const noneHidden = !this.headers.find((uH) => uH.hidden);

    header.hidden = !header.hidden;
    updatedHeader.push(header);
    this.displayTags = noneHidden
      ? !!updatedHeader.find((uH) => uH.hidden)
      : this.displayTags;
    this.stateHeaders = updatedHeader;
    this.updateGridCallback(updatedHeader, this.stateRows);
  }

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

  async componentWillLoad(): Promise<void> {
    this.stateHeaders = this.headers;
    this.stateRows = this.rows;
    this.l10n = await getL10n(this.host);
  }

  render(): JSX.Element {
    return (
      <Host>
        {this.renderContextMenu()}
        {this.renderConfigHeader()}
        {this.renderHiddenColumnsPanel()}
        {this.renderHeader()}
        {this.renderRows()}
        <slot />
      </Host>
    );
  }
}
