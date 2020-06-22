import {
  Component,
  ComponentInterface,
  Element,
  h,
  Host,
  Prop,
} from "@stencil/core";
import { Mode, Size } from "~shared/types";
import { isEmpty } from "~utils/attribute";

@Component({
  tag: "p6-action",
  styleUrl: "p6-action.scss",
  shadow: true,
})
export class P6Action implements ComponentInterface {
  @Element() host!: HTMLP6ActionElement;

  /**
   * set the mode of the action
   */
  @Prop() mode: Mode = "default";

  /**
   * If set, shows a waiting/busy indicator
   */
  @Prop() waiting = false;

  /**
   * If `true`, the user cannot interact with the Action.
   */
  @Prop() disabled = false;

  /**
   * set the size of the action
   */
  @Prop() size: Size = "small";

  render(): JSX.Element {
    const classes = {
      "is-loading": !!this.waiting,
      [`is-${this.mode}`]: !(isEmpty(this.mode) || this.mode === "default"),
      [`is-${this.size}`]: !isEmpty(this.size) && this.size !== "default",
    };

    return (
      <Host aria-disabled={this.disabled ? "true" : null}>
        <button type="button" disabled={this.disabled} class={classes}>
          <slot />
        </button>
      </Host>
    );
  }
}
