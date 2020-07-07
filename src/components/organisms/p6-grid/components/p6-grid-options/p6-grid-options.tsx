import {
  Component,
  Element,
  Event,
  EventEmitter,
  h,
  Host,
  Prop,
} from "@stencil/core";
import { Size } from "~shared/types";
import { isHidden } from "../../core/column";
import { Column, DataItem, ShowColumnDetail } from "../../core/entities";

@Component({
  tag: "p6-grid-options",
  styleUrl: "p6-grid-options.scss",
  shadow: true,
})
export class P6GridOptions {
  @Element() host!: HTMLP6GridOptionsElement;

  /**
   * List of grid columns
   */
  @Prop() columns!: Column<DataItem>[];

  /**
   * Update the visibility of the column
   */
  @Event() p6ShowColumn!: EventEmitter<ShowColumnDetail<DataItem>>;

  render(): JSX.Element {
    const hiddenColumns = this.columns.filter(isHidden);

    return (
      <Host>
        <div>{this.host.title}</div>
        {hiddenColumns.map(this.renderHiddenTag)}
      </Host>
    );
  }

  private renderHiddenTag = (
    column: Column<DataItem>,
    index: number
  ): JSX.Element => {
    return (
      <p6-tag
        data-id={column.id}
        onMouseUp={this.unhideColumn(column)}
        role="button"
        size={Size.small}
        tabIndex={index}
      >
        {column.label}
      </p6-tag>
    );
  };

  private unhideColumn(column: Column<DataItem>): (event: MouseEvent) => void {
    return (event: MouseEvent) => {
      event.preventDefault();
      event.stopImmediatePropagation();

      this.p6ShowColumn.emit({ column: { ...column, hidden: false } });
    };
  }
}
