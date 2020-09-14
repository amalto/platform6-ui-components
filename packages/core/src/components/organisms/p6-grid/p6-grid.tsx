import { Component, Element, Event, EventEmitter, h, Host, JSX, Listen, Prop, State, Watch } from '@stencil/core';
import { SortOrder } from '../../../shared/types';
import { partitionWith } from '../../../utils/array';
import { getL10n, L10n } from '../../../utils/translations';
import { P6GridHeaderColumns } from './components/p6-grid-header-columns';
import { P6GridRowCells } from './components/p6-grid-row-cells';
import { fromDefinition, isHidden, move, replaceColumn } from './core/column';
import {
  AlignColumnDetail,
  CellValueChangedDetail,
  Column,
  ColumnDefinition,
  DataItem,
  FilterRowsDetail,
  MoveColumnDetail,
  ResetDefinitionsDetail,
  ResizeColumnDetail,
  Row,
  RowId,
  ShowColumnDetail,
  ShowOptionsDetail,
  SortColumnDetail,
} from './core/entities';
import { compareRow, filterBy, fromData, rangeSelectRow, replaceRow } from './core/row';

@Component({
  tag: 'p6-grid',
  styleUrl: 'p6-grid.scss',
  assetsDirs: ['locales'],
  shadow: true,
})
export class P6Grid {
  @Element() host!: HTMLP6GridElement;

  /**
   * Display a context menu based on row data
   */
  @Prop() customContextMenu?: (row: Row<DataItem>) => JSX.Element;

  /**
   * Display spinner
   */
  @Prop() loading = false;

  /**
   * Grid headers
   */
  @Prop() definitions!: ColumnDefinition<DataItem>[];

  /**
   * Grid rows
   */
  @Prop() data!: DataItem[];

  /**
   * Listen to change event to get updated p6-grid data
   */
  @Event() p6GridConfigurationChange!: EventEmitter<{
    columns: Column<DataItem>[];
  }>;

  /**
   * Listen to change event to get updated p6-grid data
   */
  @Event() p6GridRowDataChange!: EventEmitter<{ row: DataItem[] }>;

  @State() columns: Column<DataItem>[] = [];

  @State() rows: Row<DataItem>[] = [];

  @State() selectedRows: Set<RowId> = new Set();

  @State() rowContext: Row<DataItem> | undefined;

  @State() displayTags = true;

  @State() isContextMenuOpen = false;

  @State() searchValue = '';

  @State() sortedBy: Column<DataItem> | undefined;

  @Listen('p6AlignColumn')
  onP6AlignColumn(event: CustomEvent<AlignColumnDetail<DataItem>>): void {
    this.columns = replaceColumn(event.detail.column, this.columns);

    this.p6GridConfigurationChange.emit({ columns: this.columns });
  }

  @Listen('p6MoveColumn')
  onP6MoveColumn(event: CustomEvent<MoveColumnDetail<DataItem>>): void {
    this.columns = move(event.detail.column.id, event.detail.direction, this.columns);

    this.p6GridConfigurationChange.emit({ columns: this.columns });
  }

  @Listen('p6ResizeColumn')
  onP6ResizeColumn(event: CustomEvent<ResizeColumnDetail<DataItem>>): void {
    this.columns = replaceColumn(event.detail.column, this.columns);

    this.p6GridConfigurationChange.emit({ columns: this.columns });
  }

  @Listen('p6SortColumn')
  onP6SortColumn(event: CustomEvent<SortColumnDetail<DataItem>>): void {
    this.sortedBy = event.detail.column;
    this.columns = this.columns.map(col => (col.id === event.detail.column.id ? event.detail.column : { ...col, sortOrder: SortOrder.none }));
    this.p6GridConfigurationChange.emit({ columns: this.columns });
  }

  @Listen('p6ShowColumn')
  onP6ShowColumn(event: CustomEvent<ShowColumnDetail<DataItem>>): void {
    this.columns = replaceColumn(event.detail.column, this.columns);

    this.p6GridConfigurationChange.emit({ columns: this.columns });
  }

  @Listen('p6GridCellValueChanged')
  onP6GridCellValueChanged(event: CustomEvent<CellValueChangedDetail<DataItem>>): void {
    this.rows = replaceRow(event.detail.row, this.rows);

    this.p6GridRowDataChange.emit({
      row: this.rows.map(row => row.data),
    });
  }

  @Listen('p6ResetCustomDefinitions')
  onP6ResetCustomDefinitions(event: CustomEvent<ResetDefinitionsDetail>): void {
    if (event.detail.reset) {
      this.columns = this.definitions.map(fromDefinition);
    }

    this.p6GridConfigurationChange.emit({ columns: this.columns });
  }

  @Listen('p6ShowOptions')
  onP6ShowOptions(event: CustomEvent<ShowOptionsDetail>): void {
    this.displayTags = event.detail.visible;
  }

  @Listen('p6FilterRows')
  onP6FilterRows(event: CustomEvent<FilterRowsDetail>): void {
    this.searchValue = event.detail.value;
  }

  @Watch('data')
  rowsUpdateHandler(newData: DataItem[]): void {
    this.rows = newData.map(fromData);
    this.selectedRows = new Set();
  }

  @Watch('definitions')
  columnsUpdateHandler(newDefinitions: ColumnDefinition<DataItem>[]): void {
    this.columns = newDefinitions.map(fromDefinition);
  }

  private l10n: L10n | undefined;

  private displayedRows: Row<DataItem>[] = [];

  private innerContextMenu: HTMLDivElement | null = null;

  async componentWillLoad(): Promise<void> {
    this.columns = this.definitions.map(fromDefinition);
    this.rows = this.data.map(fromData);

    [this.sortedBy] = this.columns;

    this.l10n = await getL10n(this.host);
  }

  componentWillRender(): void {
    this.displayedRows = Array.from(this.rows).filter(filterBy(this.searchValue, this.columns)).sort(compareRow(this.sortedBy));
  }

  render(): JSX.Element {
    const { loading } = this;
    const columns = partitionWith(isHidden)(this.columns);
    const displayGridOptions = columns[0].length > 0 && this.displayTags;
    const hasHeadersToDisplay = columns[1].length > 0;
    const emptyRows = this.displayedRows.length === 0;
    const hasRowsToDysplay = !this.loading && !emptyRows && hasHeadersToDisplay;

    return (
      <Host>
        {this.renderContextMenu()}

        <p6-grid-actions columns={this.columns} hideOptions={!displayGridOptions} />
        {displayGridOptions ? <p6-grid-options title={this.l10n?.hideColumn} columns={this.columns} /> : undefined}
        {hasHeadersToDisplay ? <P6GridHeaderColumns columnsToDisplay={columns[1]} /> : undefined}

        {hasRowsToDysplay ? this.renderRows(this.displayedRows, columns[1]) : undefined}
        {loading ? this.renderLoading() : undefined}
        {!loading && emptyRows ? this.renderEmpty(emptyRows || !hasHeadersToDisplay) : undefined}
        <slot />
      </Host>
    );
  }

  private renderEmpty(renderEmpty: boolean): JSX.Element | undefined {
    return renderEmpty ? <p6-empty>{this.l10n?.emptyGrid}</p6-empty> : undefined;
  }

  private renderLoading(): void {
    return this.loading ? (
      <p6-spinner
        style={{
          height: '42px',
          width: '42px',
          marginLeft: 'auto',
          marginRight: 'auto',
        }}
      />
    ) : undefined;
  }

  private renderRows = (rowsToDisplay: Row<DataItem>[], columnsToDisplay: Column<DataItem>[]): HTMLP6GridBodyElement | null => {
    return (
      <p6-grid-body>
        {rowsToDisplay.map(row => (
          <p6-grid-row
            key={`${this.host.id}-row-${row.id}`}
            onClick={this.selectRowHandler(row)}
            selected={this.selectedRows.has(row.id)}
            onContextMenu={this.rowContextMenuHandler(row)}
          >
            <P6GridRowCells row={row} columnsToDisplay={columnsToDisplay} />
          </p6-grid-row>
        ))}
      </p6-grid-body>
    );
  };

  private selectRowHandler(row: Row<DataItem>): (event: MouseEvent) => void {
    return (event: MouseEvent) => {
      if (event.ctrlKey) {
        this.selectedRows = new Set(this.selectedRows.add(row.id));
      } else if (event.shiftKey) {
        this.selectedRows = rangeSelectRow(row.id, this.selectedRows, this.displayedRows);
      } else {
        this.selectedRows = new Set([row.id]);
      }
    };
  }

  private renderContextMenu(): JSX.Element {
    const contextMenu: JSX.Element | undefined = this.rowContext && this.customContextMenu && this.customContextMenu(this.rowContext);

    return (
      <div
        class={`row-context-menu ${this.isContextMenuOpen ? 'is-open' : undefined}`}
        ref={dom => {
          if (dom) {
            this.innerContextMenu = dom;
          }
        }}
      >
        {contextMenu}
      </div>
    );
  }

  private rowContextMenuHandler(row: Row<DataItem>): (event: MouseEvent) => void {
    return (event: MouseEvent) => {
      event.preventDefault();
      this.rowContext = row;
      this.moveContextMenu(event.clientX, event.clientY);
    };
  }

  private moveContextMenu = (posX: number, posY: number): void => {
    if (this.innerContextMenu === null) {
      return;
    }

    if (!this.isContextMenuOpen) {
      this.innerContextMenu.addEventListener('click', this.onCloseContextMenu, {
        once: true,
      });
      this.isContextMenuOpen = true;
    }

    this.innerContextMenu.style.left = `${posX}px`;
    this.innerContextMenu.style.top = `${posY}px`;
  };

  private onCloseContextMenu = (): void => {
    if (this.innerContextMenu === null) {
      return;
    }
    this.innerContextMenu.removeEventListener('click', this.onCloseContextMenu);
    this.isContextMenuOpen = false;
  };
}
