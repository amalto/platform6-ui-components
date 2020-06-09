import { icon } from "@fortawesome/fontawesome-svg-core";
import { Component, h, Host } from "@stencil/core";

@Component({
  tag: "p6-empty",
  styleUrl: "p6-empty.scss",
  shadow: true,
})
export class P6Empty {
  render(): JSX.Element {
    const img = icon(
      { prefix: "far", iconName: "folder-open" },
      { classes: ["fa-3x"] }
    );

    return (
      <Host>
        <slot name="image">
          <span class="icon is-large" innerHTML={img.html[0]} />
        </slot>
        <slot>Sorry, nothing to display</slot>
      </Host>
    );
  }
}
