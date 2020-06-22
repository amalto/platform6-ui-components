import { Component, ComponentInterface, h, JSX, Prop } from "@stencil/core";
import { Mode, Size } from "~shared/types";

@Component({
  tag: "p6-tag",
  styleUrls: ["p6-tag.scss"],
  shadow: true,
})
export class P6Tag implements ComponentInterface {
  /**
   * Mode
   */
  @Prop() mode!: Mode;

  /**
   * Size
   */
  @Prop() size: Size = "small";

  render(): JSX.Element {
    return (
      <span
        class={{
          tag: true,
          [`is-${this.mode}`]: Boolean(this.mode),
          [`is-${this.size}`]: true,
        }}
      >
        <slot />
      </span>
    );
  }
}
