import { Component, ComponentInterface, h, JSX, Prop } from "@stencil/core";
import { Mode, Size } from "~shared/types";
import { getModeClass, getSizeClass } from "~utils/classes";

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
  @Prop() size: Size = Size.normal;

  render(): JSX.Element {
    return (
      <span
        class={{
          tag: true,
          ...getSizeClass(this.size),
          ...getModeClass(this.mode),
        }}
      >
        <slot />
      </span>
    );
  }
}
