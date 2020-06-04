import { icon } from "@fortawesome/fontawesome-svg-core";
import { Component, h, Prop } from "@stencil/core";
import { Mode, Position } from "~shared/types";

@Component({
  tag: "p6-help",
  styleUrl: "p6-help.scss",
  shadow: true,
})
export class P6Help {
  /**
   * Tooltip text
   */
  @Prop() text!: string;

  /**
   * Tooltip position (default position is top)
   */
  @Prop() position: Position = "top";

  /**
   * Tooltip mode
   */
  @Prop() mode: Mode = "default";

  render(): JSX.Element | null {
    const img = icon({ prefix: "fas", iconName: "question-circle" });

    return (
      <div
        class={{
          "has-tooltip-arrow": true,
          [`has-tooltip-${this.position}`]: "top" != this.position,
          [`has-tooltip-${this.mode}`]: "default" != this.mode,
        }}
        innerHTML={img.html[0]}
        data-tooltip={this.text}
      />
    );
  }
}
