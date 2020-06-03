import { icon, IconName } from "@fortawesome/fontawesome-svg-core";
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

  private iconName: IconName = "question-circle";

  private getPositionClassname(): string {
    // has-tooltip-top is not an existing class
    if (this.position === "top") {
      return "";
    }

    return `has-tooltip-${this.position}`;
  }

  private getModeClassname(): string {
    // has-tooltip-default is not an existing class
    if (this.mode === "default") {
      return "";
    }

    return `has-tooltip-${this.mode}`;
  }

  render(): JSX.Element | null {
    const img = icon({ prefix: "fas", iconName: this.iconName });

    if (img === undefined) {
      // eslint-disable-next-line no-console
      console.debug(`p6-help : could not find icon ${this.iconName}`);
      return null;
    }
    return (
      <div
        class={`has-tooltip-arrow ${this.getPositionClassname()} ${this.getModeClassname()}`}
        innerHTML={img.html[0]}
        data-tooltip={this.text}
      />
    );
  }
}
