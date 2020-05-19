import { icon, IconName, IconPrefix, parse } from "@fortawesome/fontawesome-svg-core";
import { Component, Element, h, Prop } from "@stencil/core";
import { cleanupAttributes, isEmpty } from "~utils/attribute";

export type IconStyle = IconPrefix;

@Component({
  tag: "p6-icon",
  styleUrl: "p6-icon.scss",
  shadow: true
})
export class P6Icon {
  @Element() host!: HTMLElement;

  /**
   * Icon name
   */
  @Prop() name!: IconName;

  /**
   * Style prefix
   */
  @Prop() iconPrefix: IconPrefix = "fas";

  /**
   * transformation performed on the icon.
   */
  @Prop() transform: string;

  render() {
    const transform = isEmpty(this.transform)
      ? undefined
      : parse.transform(this.transform);
    const img = icon(
      { prefix: this.iconPrefix, iconName: this.name },
      cleanupAttributes({ transform })
    );

    if (img === undefined) {
      console.debug(
        `p6-icon : could not find icon ${this.name} (style: ${this.iconPrefix})`
      );
      return null;
    }

    return <div innerHTML={img.html[0]} />;
  }
}
