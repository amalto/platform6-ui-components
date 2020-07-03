import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faEraser,
  faEyeSlash,
  faFolderOpen,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import {
  Component,
  Element,
  Event,
  EventEmitter,
  h,
  Host,
  Listen,
  Prop,
  State,
  Watch,
} from "@stencil/core";
import { HeaderCell, Row, RowCell } from "~shared/grid";
import { Align, Direction, Mode, Operation, Size } from "~shared/types";
import { isEmpty } from "~utils/attribute";
import { getL10n, L10n } from "~utils/translations";
import {
  canMoveLeft,
  canMoveRight,
  clearSelection,
  filterBySearchInput,
  getCellLabelByHeaderId,
  getHeaderCellById,
  getHeaderExcept,
  getHeaderIdxById,
  getRowCellById,
  isArrayEmpty,
  isLeft,
  isRowSelected,
  toggleSort,
  updateHeaderAttr,
} from "./utils";

export declare type EventCallBack = (event: MouseEvent) => void;
export declare type ContextMenuFunction = (row: RowCell[]) => Element;

library.add(faEraser, faEyeSlash, faFolderOpen, faSearch);

const MIN_WIDTH = 75;
const DEFAULT_WIDTH = MIN_WIDTH;
const INC_WIDTH = 10;

@Component({
  tag: "p6-grid",
  styleUrl: "p6-grid.scss",
  assetsDir: "locales",
  shadow: true,
})
export class P6Grid {
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
   * Display spinner
   */
  @Prop() loading = false;

  /**
   * Grid rows
   */
  @Prop() rows!: Row[];

  @State() displayTags = false;

  @State() isContextMenuOpen = false;

  @State() isInvalid: { [id: string]: boolean } = {};

  @State() emptyRows = false;

  @State() lastEditingCell: string | undefined = undefined;

  @State() rowContext: RowCell[] = [];

  @State() searchValue = "";

  @State() sortedBy = "";

  @State() stateHeaders: HeaderCell[] = [];

  @State() stateRows: Row[] = [];

  @State() textareaInputs: { [id: string]: HTMLTextAreaElement } = {};

  /**
   * Listen to change event to get updated p6-grid data
   */
  @Event() p6Change:
    | EventEmitter<{ header: HeaderCell[]; rows: Row[] }>
    | undefined;

  @Listen("p6AlignLeft")
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  private alignLeft(event: CustomEvent<string>): void {
    this.align(event.detail, "start");
  }

  @Listen("p6AlignCenter")
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  private alignCenter(event: CustomEvent<string>): void {
    this.align(event.detail, "center");
  }

  @Listen("p6AlignRight")
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  private alignRight(event: CustomEvent<string>): void {
    this.align(event.detail, "end");
  }

  @Listen("p6Edit")
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  private editCell(
    event: CustomEvent<{ headerId: string; cellIdx: number; rowIdx: number }>
  ): void {
    const { cellIdx, headerId, rowIdx } = event.detail;
    this.toggleEditCell(rowIdx, cellIdx, true);
    this.lastEditingCell = `${headerId}-${rowIdx}-${cellIdx}`;
  }

  @Listen("p6Hide")
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  private hide(event: CustomEvent<string>): void {
    const id: string = event.detail;

    this.toggleHide(id);
  }

  @Listen("p6Minus")
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  private minus(event: CustomEvent<string>): void {
    this.calcOrder(event.detail, "minus");
  }

  private move(id: string, direction: Direction): void {
    const { stateHeaders } = this;
    const updatedHeaders: HeaderCell[] = [];
    const idx: number = getHeaderIdxById(id, stateHeaders);

    if (
      !isArrayEmpty(stateHeaders) &&
      (canMoveLeft(idx, direction, stateHeaders) ||
        canMoveRight(idx, direction, stateHeaders))
    ) {
      for (let i = 0; i < stateHeaders.length; i += 1) {
        if (isLeft(direction)) {
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
      this.stateRows = this.initRows(this.stateRows);
    }
  }

  @Listen("p6MoveLeft")
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  private moveLeft(event: CustomEvent<string>): void {
    this.move(event.detail, "left");
  }

  @Listen("p6MoveRight")
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  private moveRight(event: CustomEvent<string>): void {
    this.move(event.detail, "right");
  }

  @Listen("p6Plus")
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  private plus(event: CustomEvent<string>): void {
    this.calcOrder(event.detail, "plus");
  }

  @Listen("p6Sort")
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  private sort(event: CustomEvent<string>): void {
    const { stateHeaders } = this;
    const id: string = event.detail;
    const idx: number = stateHeaders.findIndex((header) => header.id === id);
    const updatedHeaders: HeaderCell[] = [...stateHeaders];

    updatedHeaders[idx].sort = toggleSort(updatedHeaders[idx].sort || "asc");
    this.stateHeaders = updatedHeaders;
    this.sortedBy = id;
    this.p6Change?.emit({ header: updatedHeaders, rows: this.stateRows });
  }

  @Watch("lastEditingCell")
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  private textareaWatcher(newValue: string): void {
    setTimeout(() => {
      if (this.textareaInputs[newValue] !== undefined) {
        this.textareaInputs[newValue].focus();
      }
    }, 100);
  }

  private l10n: L10n | undefined;

  private contextMenu: HTMLDivElement | null = null;

  private spinner: (HTMLP6SpinnerElement & Node) | null = null;

  private align = (id: string, align: Align): void => {
    this.p6Change?.emit({
      header: this.updateHeaderAttr(id, "align", align),
      rows: this.stateRows,
    });
  };

  private appendSelectedRow(rowIdx: number): Row[] {
    return this.stateRows.map((row, idx) => ({
      ...row,
      selected: rowIdx === idx ? !row.selected : row.selected,
    }));
  }

  private calcOrder(id: string, operation: Operation): void {
    const header: HeaderCell = this.getHeaderCellById(id);
    const width: number = header.width || DEFAULT_WIDTH;
    const minWidth: number =
      width - INC_WIDTH < MIN_WIDTH ? MIN_WIDTH : width - INC_WIDTH;
    const newWidth: number =
      operation === "minus" ? minWidth : width + INC_WIDTH;
    this.p6Change?.emit({
      header: this.updateHeaderAttr(id, "width", newWidth),
      rows: this.stateRows,
    });
  }

  private onSearchInputKeyUp(event: KeyboardEvent): void {
    this.searchValue = (event.currentTarget as HTMLInputElement).value;
  }

  private initRows(rows: Row[]): Row[] {
    const updatedRows: Row[] = [...rows];

    updatedRows.forEach((row, idx) => {
      updatedRows[idx].cells = this.orderCells(row.cells);
    });
    return updatedRows;
  }

  private initSpinner(): void {
    this.spinner = document.createElement("p6-spinner");
    this.spinner.style.height = "2em";
    this.spinner.style.width = "2em";
    this.spinner.style.margin = "auto";
  }

  private getHeaderCellById(id: string): HeaderCell {
    return getHeaderCellById(id, this.stateHeaders);
  }

  private getHeaderExcept(id: string): HeaderCell[] {
    return getHeaderExcept(id, this.stateHeaders);
  }

  private moveContextMenu(posX: number, posY: number): void {
    if (!this.isContextMenuOpen) {
      document.addEventListener("click", this.onCloseContextMenu, {
        once: true,
      });
      this.isContextMenuOpen = true;
    }
    if (this.contextMenu) {
      this.contextMenu.style.left = `${posX}px`;
      this.contextMenu.style.top = `${posY}px`;
    }
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

  private onEditEnded(
    event: KeyboardEvent,
    rowIdx: number,
    cellIdx: number,
    textareaId?: string
  ): void {
    const target: HTMLTextAreaElement = event.currentTarget as HTMLTextAreaElement;
    const { valueMissing } = target.validity;
    const isEnterKey: boolean = event.keyCode === 13;
    const isEscKey: boolean = event.keyCode === 27;

    if (isEnterKey) {
      event.preventDefault();
    }

    if (!isEmpty(textareaId)) {
      this.isInvalid[textareaId as string] = this.textareaInputs[
        textareaId as string
      ].checkValidity();
    }

    if (isEnterKey || isEscKey) {
      if (!valueMissing && isEnterKey) {
        this.updateCellValue(target.value, cellIdx, rowIdx);
      }
      if (!(valueMissing && isEnterKey)) {
        this.toggleEditCell(rowIdx, cellIdx, false);
        if (!isEmpty(textareaId)) {
          delete this.textareaInputs[textareaId as string];
          this.lastEditingCell = undefined;
        }
      }
    }
  }

  private orderCells(cells: RowCell[]): RowCell[] {
    const orderedHeaders: string[] = this.stateHeaders
      .filter((header) => !header.hidden)
      .map((header) => header.id);
    const orderedCells: RowCell[] = [];

    orderedHeaders.forEach((id) => {
      orderedCells.push(getRowCellById(id, cells));
    });
    return orderedCells;
  }

  private renderCellEditComponent(
    id: string,
    rowIdx: number,
    cellIdx: number
  ): HTMLDivElement {
    const { stateRows } = this;
    return (
      <div>
        <textarea
          id={id}
          name={id}
          // eslint-disable-next-line react/jsx-no-bind
          onKeyDown={(event: KeyboardEvent) => {
            this.onEditEnded(event, rowIdx, cellIdx, id);
          }}
          ref={(dom) => {
            this.textareaInputs[id] = dom as HTMLTextAreaElement;
          }}
          required
          rows={1}
          value={stateRows[rowIdx].cells[cellIdx].label}
        />
        <span class="validation-message has-text-danger">
          {this.textareaInputs[id]?.validationMessage}
        </span>
      </div>
    );
  }

  private renderHeader(): HTMLP6GridHeaderElement {
    const { stateHeaders } = this;
    // const lastIndex: number = stateHeaders.length;
    const displayableHeader: HeaderCell[] = stateHeaders.filter(
      (cell) => !cell.hidden
    );
    return (
      <p6-grid-header>
        {displayableHeader.map((header, idx) => (
          <p6-grid-cell
            disabled={header.disabled}
            cellIdx={idx}
            color={header.color}
            headerId={header.id}
            width={header.width}
          >
            {header.label}
          </p6-grid-cell>
        ))}
      </p6-grid-header>
    );
  }

  private renderRowCell = (
    cell: RowCell,
    rowIdx: number,
    cellIdx: number
  ): HTMLP6GridCellElement => {
    const header: HeaderCell = this.getHeaderCellById(cell.headerId);

    return (
      <p6-grid-cell
        align={header.align}
        cellIdx={cellIdx}
        color={header.color}
        editing={cell.edit}
        headerId={cell.headerId}
        label={cell.label}
        // eslint-disable-next-line react/jsx-no-bind
        renderCellEditComponent={
          cell.edit ? this.renderCellEditComponent : undefined
        }
        rowIdx={rowIdx}
        width={header.width}
      >
        {cell.edit ? null : cell.label}
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
      orderedCells.push(getRowCellById(id, row.cells));
    });

    return (
      <p6-grid-row
        // eslint-disable-next-line react/jsx-no-bind
        contextMenuCallback={() => {
          this.setRowContextMenu(row);
        }}
        data-row-idx={rowId.toString()}
        key={`${this.host.id}-row-${rowId}`}
        onClick={this.selectRow}
        moveContextMenu={this.moveContextMenu}
        selected={isRowSelected(row)}
      >
        {orderedCells.map((cell, idx) => this.renderRowCell(cell, rowId, idx))}
      </p6-grid-row>
    );
  };

  private renderRows = (filteredRows: Row[]): HTMLP6GridBodyElement | null => {
    const { rows, stateHeaders } = this;

    if (rows.length === 0) {
      return null;
    }

    const orderedHeaders: string[] = stateHeaders
      .filter((header) => !header.hidden)
      .map((header) => header.id);
    const rowsElements: HTMLP6GridRowElement[] = filteredRows.map(
      (row, idx) => {
        return this.renderRow(idx, row, orderedHeaders);
      }
    );

    return <p6-grid-body>{rowsElements}</p6-grid-body>;
  };

  private renderConfigHeader(): JSX.Element {
    const hasHeaderHidden: boolean = this.stateHeaders.some(
      (header) => header.hidden
    );
    return (
      <div class="level">
        <div class="level-left">
          {hasHeaderHidden ? (
            <p6-action mode={Mode.info} onClick={this.toggleDisplayTags}>
              <p6-icon name="eye-slash" />
            </p6-action>
          ) : undefined}
          <p6-action mode={Mode.danger} onClick={this.resetGrid}>
            <p6-icon name="eraser" />
          </p6-action>
        </div>
        <div class="level-right">{this.renderSearchInput()}</div>
      </div>
    );
  }

  private renderSearchInput(): JSX.Element {
    return (
      <div class="control has-icons-left">
        <p6-icon class="has-text-grey-lighter" name="search" />
        <input
          class="input is-small"
          onKeyUp={this.onSearchInputKeyUp}
          placeholder={this.l10n?.search}
          type="text"
          value={this.searchValue}
        />
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

  private renderEmpty(renderEmpty: boolean): JSX.Element | undefined {
    return renderEmpty ? (
      <p6-empty>
        <p6-icon name="folder-open" iconPrefix="far" slot="image" />
        {this.l10n?.emptyGrid}
      </p6-empty>
    ) : undefined;
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
        {hiddenColumns.map(this.renderHiddenTag)}
      </div>
    );
  }

  private renderHiddenTag(header: HeaderCell, idx: number): JSX.Element {
    return (
      <p6-tag
        data-header-id={header.id}
        onMouseUp={this.toogleDisplayColumn}
        role="button"
        size={Size.small}
        tabIndex={idx}
      >
        {header.label}
      </p6-tag>
    );
  }

  private resetGrid(): void {
    const { headers } = this;

    this.stateHeaders = headers.map((header) => ({
      ...header,
      hidden: false,
    }));
    this.displayTags = false;
    this.p6Change?.emit({
      header: this.stateHeaders,
      rows: this.stateRows,
    });
  }

  private renderLoadingContent(): void {
    if (this.spinner) {
      if (this.loading) {
        this.host.appendChild(this.spinner);
      } else if (this.spinner.parentNode === (this.host as Node)) {
        this.host.removeChild(this.spinner);
      }
    }
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
      this.p6Change?.emit({
        header: this.stateHeaders,
        rows: this.stateRows,
      });
    }
  }

  private sortRows(): Row[] {
    const { sortedBy, stateRows } = this;
    const header: HeaderCell = this.getHeaderCellById(sortedBy);

    return stateRows.sort((a, b) => {
      const cellA: RowCell = getRowCellById(sortedBy, a.cells);
      const cellB: RowCell = getRowCellById(sortedBy, b.cells);
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

  private toggleEditCell(rowIdx: number, cellIdx: number, edit: boolean): void {
    const { stateRows } = this;
    const updatedRows: Row[] = [...stateRows];
    const { cells } = updatedRows[rowIdx];

    cells[cellIdx].edit = edit;
    updatedRows[rowIdx].cells = cells;
    this.stateRows = updatedRows;
  }

  private toggleHide(id: string): void {
    const header: HeaderCell = this.getHeaderCellById(id);
    const updatedHeader: HeaderCell[] = this.getHeaderExcept(id);

    header.hidden = !header.hidden;
    updatedHeader.push(header);
    this.displayTags = !!updatedHeader.find((uH) => uH.hidden);
    this.stateHeaders = updatedHeader;
    this.p6Change?.emit({
      header: updatedHeader,
      rows: this.stateRows,
    });
  }

  private updateHeaderAttr(
    id: string,
    attrName: string,
    attr: unknown
  ): HeaderCell[] {
    this.stateHeaders = updateHeaderAttr(id, attrName, attr, this.stateHeaders);
    return this.stateHeaders;
  }

  private updateCellValue(value: string, cellIdx: number, rowId: number): void {
    const updatedRows: Row[] = [...this.stateRows];

    updatedRows[rowId].cells[cellIdx].label = value;
    this.stateRows = updatedRows;
  }

  async componentWillLoad(): Promise<void> {
    this.stateHeaders = this.headers;
    this.stateRows = this.initRows(this.rows);
    this.sortedBy = this.stateHeaders[0].id;
    this.l10n = await getL10n(this.host);
    this.initSpinner();

    this.moveContextMenu = this.moveContextMenu.bind(this);
    this.onCloseContextMenu = this.onCloseContextMenu.bind(this);
    this.onSearchInputKeyUp = this.onSearchInputKeyUp.bind(this);
    this.resetGrid = this.resetGrid.bind(this);
    this.toogleDisplayColumn = this.toogleDisplayColumn.bind(this);
    this.renderCellEditComponent = this.renderCellEditComponent.bind(this);
    this.renderHiddenTag = this.renderHiddenTag.bind(this);
    this.selectRow = this.selectRow.bind(this);
    this.toggleDisplayTags = this.toggleDisplayTags.bind(this);
  }

  render(): JSX.Element {
    const { loading } = this;
    const noRows: boolean = this.stateRows.length === 0;
    const headerHidden = !this.stateHeaders.some(
      (header) => !header.hidden || false
    );
    const filteredRows: Row[] = filterBySearchInput(
      this.searchValue,
      this.sortRows()
    );
    const emptyRows: boolean = filteredRows.length === 0;
    this.renderLoadingContent();

    return (
      <Host>
        {this.renderContextMenu()}
        {this.renderConfigHeader()}
        {this.renderHiddenColumnsPanel()}
        {!headerHidden ? this.renderHeader() : undefined}
        {!loading && !noRows && !headerHidden && !emptyRows
          ? this.renderRows(filteredRows)
          : undefined}
        {!loading || emptyRows
          ? this.renderEmpty(emptyRows || noRows || headerHidden)
          : undefined}
        <slot />
      </Host>
    );
  }
}
