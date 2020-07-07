import { Component, ComponentInterface, h, Host, Prop } from "@stencil/core";
import { SortOrder } from "~shared/types";
import { toWidth } from "~utils/css";
import { DEFAULT_WIDTH } from "../../core/column";
import { Column, DataItem } from "../../core/entities";

function SortMarker(props: { order?: SortOrder }): JSX.Element | undefined {
  if (props.order === SortOrder.Asc) {
    return <p6-icon name="long-arrow-alt-up" />;
  }
  if (props.order === SortOrder.Desc) {
    return <p6-icon name="long-arrow-alt-down" />;
  }

  return undefined;
}

@Component({
  tag: "p6-grid-header-cell",
  styleUrl: "p6-grid-header-cell.scss",
  shadow: true,
})
export class P6GridHeaderCell implements ComponentInterface {
  /**
   * the column
   */
  @Prop() column!: Column<DataItem>;

  /**
   * Cell width
   */
  @Prop() width: number | string = DEFAULT_WIDTH;

  /**
   * Disabled templating
   */
  @Prop() disabled = false;

  /**
   * Displays the sort order of this column
   */
  @Prop() sortOrder: SortOrder = SortOrder.None;

  render(): JSX.Element {
    const { disabled, width } = this;
    const styles = {
      width: toWidth(width),
    };

    return (
      <Host style={styles}>
        <div class="wrapper">
          <div class="label">
            <SortMarker order={this.sortOrder} />
            <slot />
          </div>
          {!disabled ? (
            <p6-grid-header-menu
              class="grid-cell-context-menu"
              align={this.column.align}
              sortOrder={this.sortOrder}
              column={this.column}
            />
          ) : null}
        </div>
      </Host>
    );
  }
}
