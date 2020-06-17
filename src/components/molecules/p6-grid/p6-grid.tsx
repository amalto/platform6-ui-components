import { Component, Element, h, Host, Prop } from "@stencil/core";
import { Align } from "~shared/types";

export interface Cell {
  align?: Align;
  color?: string;
  label: string;
  width?: number;
}

export interface HeaderCell extends Cell {
  id: string;
  movable?: string;
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
  @Prop() rows: RowCell[][] | undefined = [];

  private renderHeader(): HTMLP6GridHeaderElement {
    return (
      <p6-grid-header>
        {this.headers.map((header) => (
          <p6-grid-cell color={header.color} width={header.width}>
            {header.label}
          </p6-grid-cell>
        ))}
      </p6-grid-header>
    );
  }

  private renderRowCell = (cell: RowCell): HTMLP6GridCellElement => {
    const { align, color, label, width } = cell;
    return (
      <p6-grid-cell align={align} color={color} width={width}>
        {label}
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

    return <p6-grid-row>{orderedCells.map(this.renderRowCell)}</p6-grid-row>;
  };

  private renderRows = (): HTMLP6GridRowElement[][] | null => {
    const { headers } = this;

    if (!this.rows || this.rows.length === 0) {
      return null;
    }

    const orderedHeaders: string[] = headers.map((header) => header.id);

    return this.rows.map((row) => {
      return this.renderRow(row, orderedHeaders);
    });
  };

  render(): JSX.Element {
    return (
      <Host>
        {this.renderHeader()}
        <p6-grid-body>{this.renderRows()}</p6-grid-body>
        <slot />
      </Host>
    );
  }
}
