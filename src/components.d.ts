/* eslint-disable */
/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */
import { IconName, IconPrefix } from "@fortawesome/fontawesome-svg-core";
import { HTMLStencilElement, JSXBase } from "@stencil/core/internal";
import { Mode, Position, Size } from "~shared/types";
import { P6ButtonType } from "./components/atoms/p6-button/p6-button";
import { P6InputType } from "./components/atoms/p6-input/p6-input";
import { Target } from "./components/atoms/p6-link/p6-link";
export namespace Components {
  interface P6Action {
    /**
     * If `true`, the user cannot interact with the Action.
     */
    disabled: boolean;
    /**
     * set the mode of the action
     */
    mode: Mode;
    /**
     * set the size of the action
     */
    size: Size;
    /**
     * If set, shows a waiting/busy indicator
     */
    waiting: boolean;
  }
  interface P6Button {
    /**
     * Disabled - If `true`, the user cannot interact with the button.
     */
    disabled: boolean;
    /**
     * set the mode of the button
     */
    mode: Mode;
    /**
     * Outlined
     */
    outlined: boolean;
    /**
     * set the size of the button
     */
    size: Size;
    /**
     * type of the button.
     */
    type: P6ButtonType;
    /**
     * If set, shows a waiting/busy indicator
     */
    waiting: boolean;
  }
  interface P6Checkbox {
    /**
     * Initial value
     */
    checked: boolean;
    /**
     * Disable
     */
    disabled: boolean;
    /**
     * Checkbox name
     */
    name: string;
  }
  interface P6Dropdown {}
  interface P6Help {
    /**
     * Tooltip mode
     */
    mode: Mode;
    /**
     * Tooltip position (default position is top)
     */
    position: Position;
    /**
     * Tooltip text
     */
    text: string;
  }
  interface P6Icon {
    /**
     * Style prefix
     */
    iconPrefix: IconPrefix;
    /**
     * Icon name
     */
    name: IconName;
    /**
     * transformation performed on the icon.
     */
    transform: string | undefined;
  }
  interface P6Input {
    /**
     * Returns whether a form will validate when it is submitted, without having to submit it.
     */
    checkValidity: () => Promise<boolean>;
    /**
     * the input is not available for interaction. The value will not be submitted with the form
     */
    disabled: boolean;
    /**
     * The maximum length or value
     */
    max: string | undefined;
    /**
     * The minimum length or value
     */
    min: string | undefined;
    /**
     * Enables multiline support (with a textarea instead of an input)
     */
    multiline: boolean;
    /**
     * The name of the input.
     */
    name: string;
    /**
     * Pattern the value must match to be valid.
     */
    pattern: string | undefined;
    /**
     * content to be appear in the form control when the form control is empty
     */
    placeholder: string | undefined;
    /**
     * marks an element that can't be edited.
     */
    readonly: boolean;
    /**
     * marks an element that can't be submitted without a value.
     */
    required: boolean;
    /**
     * the content type of the input.
     */
    type: P6InputType;
    /**
     * the value of the input.
     */
    value: string | undefined;
    /**
     * shows a waiting indicator
     */
    waiting: boolean;
  }
  interface P6Link {
    /**
     * This attribute instructs browsers to download a URL instead of navigating to it, so the user will be prompted to save it as a local file. If the attribute has a value, it is used as the pre-filled file name in the Save prompt (the user can still change the file name if they want). Only applies when an `href` is provided.
     */
    download: string | undefined;
    /**
     * The URL that the hyperlink points to. Links are not restricted to HTTP-based URLs — they can use any URL scheme supported by browsers.
     */
    href: string | undefined;
    /**
     * Sets or retrieves the relationship between the object and the destination of the link. The value is a space-separated list of [link types](https://developer.mozilla.org/en-US/docs/Web/HTML/Link_types). Only applies when an `href` is provided.
     */
    rel: string | undefined;
    /**
     * Sets or retrieves the window or frame at which to target content. Only applies when an `href` is provided.
     */
    target: Target | undefined;
  }
  interface P6Radio {
    /**
     * Initial value
     */
    checked: boolean;
    /**
     * Disable
     */
    disabled: boolean;
    /**
     * Radio name
     */
    name: string;
    /**
     * Readonly
     */
    readonly: boolean;
    /**
     * Value
     */
    value: string | number;
  }
  interface P6Spinner {}
  interface P6Switch {
    /**
     * Initial value
     */
    checked: boolean;
    /**
     * Disable
     */
    disabled: boolean;
    /**
     * Switch name
     */
    name: string;
  }
  interface P6Waiting {}
}
declare global {
  interface HTMLP6ActionElement
    extends Components.P6Action,
      HTMLStencilElement {}
  var HTMLP6ActionElement: {
    prototype: HTMLP6ActionElement;
    new (): HTMLP6ActionElement;
  };
  interface HTMLP6ButtonElement
    extends Components.P6Button,
      HTMLStencilElement {}
  var HTMLP6ButtonElement: {
    prototype: HTMLP6ButtonElement;
    new (): HTMLP6ButtonElement;
  };
  interface HTMLP6CheckboxElement
    extends Components.P6Checkbox,
      HTMLStencilElement {}
  var HTMLP6CheckboxElement: {
    prototype: HTMLP6CheckboxElement;
    new (): HTMLP6CheckboxElement;
  };
  interface HTMLP6DropdownElement
    extends Components.P6Dropdown,
      HTMLStencilElement {}
  var HTMLP6DropdownElement: {
    prototype: HTMLP6DropdownElement;
    new (): HTMLP6DropdownElement;
  };
  interface HTMLP6HelpElement extends Components.P6Help, HTMLStencilElement {}
  var HTMLP6HelpElement: {
    prototype: HTMLP6HelpElement;
    new (): HTMLP6HelpElement;
  };
  interface HTMLP6IconElement extends Components.P6Icon, HTMLStencilElement {}
  var HTMLP6IconElement: {
    prototype: HTMLP6IconElement;
    new (): HTMLP6IconElement;
  };
  interface HTMLP6InputElement extends Components.P6Input, HTMLStencilElement {}
  var HTMLP6InputElement: {
    prototype: HTMLP6InputElement;
    new (): HTMLP6InputElement;
  };
  interface HTMLP6LinkElement extends Components.P6Link, HTMLStencilElement {}
  var HTMLP6LinkElement: {
    prototype: HTMLP6LinkElement;
    new (): HTMLP6LinkElement;
  };
  interface HTMLP6RadioElement extends Components.P6Radio, HTMLStencilElement {}
  var HTMLP6RadioElement: {
    prototype: HTMLP6RadioElement;
    new (): HTMLP6RadioElement;
  };
  interface HTMLP6SpinnerElement
    extends Components.P6Spinner,
      HTMLStencilElement {}
  var HTMLP6SpinnerElement: {
    prototype: HTMLP6SpinnerElement;
    new (): HTMLP6SpinnerElement;
  };
  interface HTMLP6SwitchElement
    extends Components.P6Switch,
      HTMLStencilElement {}
  var HTMLP6SwitchElement: {
    prototype: HTMLP6SwitchElement;
    new (): HTMLP6SwitchElement;
  };
  interface HTMLP6WaitingElement
    extends Components.P6Waiting,
      HTMLStencilElement {}
  var HTMLP6WaitingElement: {
    prototype: HTMLP6WaitingElement;
    new (): HTMLP6WaitingElement;
  };
  interface HTMLElementTagNameMap {
    "p6-action": HTMLP6ActionElement;
    "p6-button": HTMLP6ButtonElement;
    "p6-checkbox": HTMLP6CheckboxElement;
    "p6-dropdown": HTMLP6DropdownElement;
    "p6-help": HTMLP6HelpElement;
    "p6-icon": HTMLP6IconElement;
    "p6-input": HTMLP6InputElement;
    "p6-link": HTMLP6LinkElement;
    "p6-radio": HTMLP6RadioElement;
    "p6-spinner": HTMLP6SpinnerElement;
    "p6-switch": HTMLP6SwitchElement;
    "p6-waiting": HTMLP6WaitingElement;
  }
}
declare namespace LocalJSX {
  interface P6Action {
    /**
     * If `true`, the user cannot interact with the Action.
     */
    disabled?: boolean;
    /**
     * set the mode of the action
     */
    mode?: Mode;
    /**
     * set the size of the action
     */
    size?: Size;
    /**
     * If set, shows a waiting/busy indicator
     */
    waiting?: boolean;
  }
  interface P6Button {
    /**
     * Disabled - If `true`, the user cannot interact with the button.
     */
    disabled?: boolean;
    /**
     * set the mode of the button
     */
    mode?: Mode;
    /**
     * Outlined
     */
    outlined?: boolean;
    /**
     * set the size of the button
     */
    size?: Size;
    /**
     * type of the button.
     */
    type?: P6ButtonType;
    /**
     * If set, shows a waiting/busy indicator
     */
    waiting?: boolean;
  }
  interface P6Checkbox {
    /**
     * Initial value
     */
    checked?: boolean;
    /**
     * Disable
     */
    disabled?: boolean;
    /**
     * Checkbox name
     */
    name: string;
  }
  interface P6Dropdown {}
  interface P6Help {
    /**
     * Tooltip mode
     */
    mode?: Mode;
    /**
     * Tooltip position (default position is top)
     */
    position?: Position;
    /**
     * Tooltip text
     */
    text: string;
  }
  interface P6Icon {
    /**
     * Style prefix
     */
    iconPrefix?: IconPrefix;
    /**
     * Icon name
     */
    name: IconName;
    /**
     * transformation performed on the icon.
     */
    transform?: string | undefined;
  }
  interface P6Input {
    /**
     * the input is not available for interaction. The value will not be submitted with the form
     */
    disabled?: boolean;
    /**
     * The maximum length or value
     */
    max?: string | undefined;
    /**
     * The minimum length or value
     */
    min?: string | undefined;
    /**
     * Enables multiline support (with a textarea instead of an input)
     */
    multiline?: boolean;
    /**
     * The name of the input.
     */
    name: string;
    /**
     * Pattern the value must match to be valid.
     */
    pattern?: string | undefined;
    /**
     * content to be appear in the form control when the form control is empty
     */
    placeholder?: string | undefined;
    /**
     * marks an element that can't be edited.
     */
    readonly?: boolean;
    /**
     * marks an element that can't be submitted without a value.
     */
    required?: boolean;
    /**
     * the content type of the input.
     */
    type?: P6InputType;
    /**
     * the value of the input.
     */
    value?: string | undefined;
    /**
     * shows a waiting indicator
     */
    waiting?: boolean;
  }
  interface P6Link {
    /**
     * This attribute instructs browsers to download a URL instead of navigating to it, so the user will be prompted to save it as a local file. If the attribute has a value, it is used as the pre-filled file name in the Save prompt (the user can still change the file name if they want). Only applies when an `href` is provided.
     */
    download?: string | undefined;
    /**
     * The URL that the hyperlink points to. Links are not restricted to HTTP-based URLs — they can use any URL scheme supported by browsers.
     */
    href?: string | undefined;
    /**
     * Sets or retrieves the relationship between the object and the destination of the link. The value is a space-separated list of [link types](https://developer.mozilla.org/en-US/docs/Web/HTML/Link_types). Only applies when an `href` is provided.
     */
    rel?: string | undefined;
    /**
     * Sets or retrieves the window or frame at which to target content. Only applies when an `href` is provided.
     */
    target?: Target | undefined;
  }
  interface P6Radio {
    /**
     * Initial value
     */
    checked?: boolean;
    /**
     * Disable
     */
    disabled?: boolean;
    /**
     * Radio name
     */
    name: string;
    /**
     * Readonly
     */
    readonly?: boolean;
    /**
     * Value
     */
    value: string | number;
  }
  interface P6Spinner {}
  interface P6Switch {
    /**
     * Initial value
     */
    checked?: boolean;
    /**
     * Disable
     */
    disabled?: boolean;
    /**
     * Switch name
     */
    name: string;
  }
  interface P6Waiting {}
  interface IntrinsicElements {
    "p6-action": P6Action;
    "p6-button": P6Button;
    "p6-checkbox": P6Checkbox;
    "p6-dropdown": P6Dropdown;
    "p6-help": P6Help;
    "p6-icon": P6Icon;
    "p6-input": P6Input;
    "p6-link": P6Link;
    "p6-radio": P6Radio;
    "p6-spinner": P6Spinner;
    "p6-switch": P6Switch;
    "p6-waiting": P6Waiting;
  }
}
export { LocalJSX as JSX };
declare module "@stencil/core" {
  export namespace JSX {
    interface IntrinsicElements {
      "p6-action": LocalJSX.P6Action &
        JSXBase.HTMLAttributes<HTMLP6ActionElement>;
      "p6-button": LocalJSX.P6Button &
        JSXBase.HTMLAttributes<HTMLP6ButtonElement>;
      "p6-checkbox": LocalJSX.P6Checkbox &
        JSXBase.HTMLAttributes<HTMLP6CheckboxElement>;
      "p6-dropdown": LocalJSX.P6Dropdown &
        JSXBase.HTMLAttributes<HTMLP6DropdownElement>;
      "p6-help": LocalJSX.P6Help & JSXBase.HTMLAttributes<HTMLP6HelpElement>;
      "p6-icon": LocalJSX.P6Icon & JSXBase.HTMLAttributes<HTMLP6IconElement>;
      "p6-input": LocalJSX.P6Input & JSXBase.HTMLAttributes<HTMLP6InputElement>;
      "p6-link": LocalJSX.P6Link & JSXBase.HTMLAttributes<HTMLP6LinkElement>;
      "p6-radio": LocalJSX.P6Radio & JSXBase.HTMLAttributes<HTMLP6RadioElement>;
      "p6-spinner": LocalJSX.P6Spinner &
        JSXBase.HTMLAttributes<HTMLP6SpinnerElement>;
      "p6-switch": LocalJSX.P6Switch &
        JSXBase.HTMLAttributes<HTMLP6SwitchElement>;
      "p6-waiting": LocalJSX.P6Waiting &
        JSXBase.HTMLAttributes<HTMLP6WaitingElement>;
    }
  }
}
