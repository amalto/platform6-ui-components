import { Component, Element, h, Host, Listen, State } from "@stencil/core";
import { addDropdownClass } from "./utils";

@Component({
  tag: "p6-dropdown",
  styleUrl: "p6-dropdown.scss",
  shadow: true,
})
export class P6Dropdown {
  @Element() host!: HTMLP6DropdownElement;

  @State() isActive = false;

  // eslint-disable-next-line @stencil/prefer-vdom-listener
  @Listen("focusout")
  public lostFocusHandler(): void {
    this.isActive = false;
  }

  render(): JSX.Element {
    const containerClass = {
      dropdown: true,
      "is-active": this.isActive,
    };

    const children = Array.from(this.host.children)
      .filter((c) => c.slot !== "label")
      .map(addDropdownClass)
      .map((c) => c.outerHTML);

    return (
      <Host>
        <div class={containerClass}>
          <div class="dropdown-trigger">
            <p6-button
              class="button"
              aria-haspopup="true"
              aria-controls="dropdown-menu"
              onClick={this.toggleMenuHandler}
            >
              <slot name="label" />
              <p6-icon
                name="angle-down"
                class="icon is-small"
                aria-hidden="true"
              />
            </p6-button>
          </div>
          <div class="dropdown-menu" id="dropdown-menu" role="menu">
            <div class="dropdown-content" innerHTML={children.join("")} />
          </div>
        </div>
      </Host>
    );
  }

  private toggleMenuHandler = (): void => {
    this.isActive = !this.isActive;
  };
}
