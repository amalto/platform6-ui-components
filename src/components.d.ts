/* eslint-disable */
/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */
import { HTMLStencilElement, JSXBase } from "@stencil/core/internal";
import { Mode, Type, } from "./components/atoms/p6-button/p6-button";
import { Type as Type1, } from "./components/atoms/p6-input/p6-input";
import { Target, } from "./components/atoms/p6-link/p6-link";
export namespace Components {
    interface MyComponent {
        /**
          * The first name
         */
        "first": string;
        /**
          * The last name
         */
        "last": string;
        /**
          * The middle name
         */
        "middle": string;
    }
    interface P6Button {
        /**
          * Disabled - If `true`, the user cannot interact with the button.
         */
        "disabled": boolean;
        /**
          * Mode - set the mode of the button
         */
        "mode": Mode;
        /**
          * Outlined
         */
        "outlined": boolean;
        /**
          * Type - type of the button.
         */
        "type": Type;
        /**
          * Waiting - If set, shows a waiting/busy indicator
         */
        "waiting": boolean;
    }
    interface P6Checkbox {
        /**
          * Initial value
         */
        "checked": boolean;
        /**
          * Disable
         */
        "disabled": boolean;
        /**
          * Checkbox name
         */
        "name": string;
    }
    interface P6Input {
        "disabled": boolean;
        /**
          * The maximum length or value
         */
        "max": string;
        /**
          * The minimum length or value
         */
        "min": string;
        "multiline": boolean;
        /**
          * The name of the input.
         */
        "name": string;
        /**
          * Pattern the value must match to be valid.
         */
        "pattern": string;
        /**
          * content to be appear in the form control when the form control is empty
         */
        "placeholder": string;
        /**
          * marks an element that can't be edited.
         */
        "readonly": boolean;
        /**
          * marks an element that can't be submitted without a value.
         */
        "required": boolean;
        /**
          * the content type of the input.
         */
        "type": Type;
        /**
          * the value of the input.
         */
        "value": string;
        /**
          * shows a waiting indicator
         */
        "waiting": boolean;
    }
    interface P6Link {
        /**
          * This attribute instructs browsers to download a URL instead of navigating to it, so the user will be prompted to save it as a local file. If the attribute has a value, it is used as the pre-filled file name in the Save prompt (the user can still change the file name if they want). Only applies when an `href` is provided.
         */
        "download": string | undefined;
        /**
          * The URL that the hyperlink points to.  Links are not restricted to HTTP-based URLs — they can use any URL scheme supported by browsers.
         */
        "href": string | undefined;
        /**
          * Sets or retrieves the relationship between the object and the destination of the link. The value is a space-separated list of [link types](https://developer.mozilla.org/en-US/docs/Web/HTML/Link_types). Only applies when an `href` is provided.
         */
        "rel": string | undefined;
        /**
          * Sets or retrieves the window or frame at which to target content. Only applies when an `href` is provided.
         */
        "target": Target | undefined;
    }
    interface P6Radio {
        /**
          * Initial value
         */
        "checked": boolean;
        /**
          * Disable
         */
        "disabled": boolean;
        /**
          * Radio name
         */
        "name": string;
        /**
          * Readonly
         */
        "readonly": boolean;
        /**
          * Value
         */
        "value": string | number;
    }
    interface P6Spinner {
    }
}
declare global {
    interface HTMLMyComponentElement extends Components.MyComponent, HTMLStencilElement {
    }
    var HTMLMyComponentElement: {
        prototype: HTMLMyComponentElement;
        new (): HTMLMyComponentElement;
    };
    interface HTMLP6ButtonElement extends Components.P6Button, HTMLStencilElement {
    }
    var HTMLP6ButtonElement: {
        prototype: HTMLP6ButtonElement;
        new (): HTMLP6ButtonElement;
    };
    interface HTMLP6CheckboxElement extends Components.P6Checkbox, HTMLStencilElement {
    }
    var HTMLP6CheckboxElement: {
        prototype: HTMLP6CheckboxElement;
        new (): HTMLP6CheckboxElement;
    };
    interface HTMLP6InputElement extends Components.P6Input, HTMLStencilElement {
    }
    var HTMLP6InputElement: {
        prototype: HTMLP6InputElement;
        new (): HTMLP6InputElement;
    };
    interface HTMLP6LinkElement extends Components.P6Link, HTMLStencilElement {
    }
    var HTMLP6LinkElement: {
        prototype: HTMLP6LinkElement;
        new (): HTMLP6LinkElement;
    };
    interface HTMLP6RadioElement extends Components.P6Radio, HTMLStencilElement {
    }
    var HTMLP6RadioElement: {
        prototype: HTMLP6RadioElement;
        new (): HTMLP6RadioElement;
    };
    interface HTMLP6SpinnerElement extends Components.P6Spinner, HTMLStencilElement {
    }
    var HTMLP6SpinnerElement: {
        prototype: HTMLP6SpinnerElement;
        new (): HTMLP6SpinnerElement;
    };
    interface HTMLElementTagNameMap {
        "my-component": HTMLMyComponentElement;
        "p6-button": HTMLP6ButtonElement;
        "p6-checkbox": HTMLP6CheckboxElement;
        "p6-input": HTMLP6InputElement;
        "p6-link": HTMLP6LinkElement;
        "p6-radio": HTMLP6RadioElement;
        "p6-spinner": HTMLP6SpinnerElement;
    }
}
declare namespace LocalJSX {
    interface MyComponent {
        /**
          * The first name
         */
        "first"?: string;
        /**
          * The last name
         */
        "last"?: string;
        /**
          * The middle name
         */
        "middle"?: string;
    }
    interface P6Button {
        /**
          * Disabled - If `true`, the user cannot interact with the button.
         */
        "disabled"?: boolean;
        /**
          * Mode - set the mode of the button
         */
        "mode"?: Mode;
        /**
          * Outlined
         */
        "outlined"?: boolean;
        /**
          * Type - type of the button.
         */
        "type"?: Type;
        /**
          * Waiting - If set, shows a waiting/busy indicator
         */
        "waiting"?: boolean;
    }
    interface P6Checkbox {
        /**
          * Initial value
         */
        "checked"?: boolean;
        /**
          * Disable
         */
        "disabled"?: boolean;
        /**
          * Checkbox name
         */
        "name": string;
    }
    interface P6Input {
        "disabled"?: boolean;
        /**
          * The maximum length or value
         */
        "max"?: string;
        /**
          * The minimum length or value
         */
        "min"?: string;
        "multiline"?: boolean;
        /**
          * The name of the input.
         */
        "name": string;
        /**
          * Pattern the value must match to be valid.
         */
        "pattern"?: string;
        /**
          * content to be appear in the form control when the form control is empty
         */
        "placeholder"?: string;
        /**
          * marks an element that can't be edited.
         */
        "readonly"?: boolean;
        /**
          * marks an element that can't be submitted without a value.
         */
        "required"?: boolean;
        /**
          * the content type of the input.
         */
        "type"?: Type;
        /**
          * the value of the input.
         */
        "value"?: string;
        /**
          * shows a waiting indicator
         */
        "waiting"?: boolean;
    }
    interface P6Link {
        /**
          * This attribute instructs browsers to download a URL instead of navigating to it, so the user will be prompted to save it as a local file. If the attribute has a value, it is used as the pre-filled file name in the Save prompt (the user can still change the file name if they want). Only applies when an `href` is provided.
         */
        "download"?: string | undefined;
        /**
          * The URL that the hyperlink points to.  Links are not restricted to HTTP-based URLs — they can use any URL scheme supported by browsers.
         */
        "href"?: string | undefined;
        /**
          * Sets or retrieves the relationship between the object and the destination of the link. The value is a space-separated list of [link types](https://developer.mozilla.org/en-US/docs/Web/HTML/Link_types). Only applies when an `href` is provided.
         */
        "rel"?: string | undefined;
        /**
          * Sets or retrieves the window or frame at which to target content. Only applies when an `href` is provided.
         */
        "target"?: Target | undefined;
    }
    interface P6Radio {
        /**
          * Initial value
         */
        "checked"?: boolean;
        /**
          * Disable
         */
        "disabled"?: boolean;
        /**
          * Radio name
         */
        "name": string;
        /**
          * Readonly
         */
        "readonly"?: boolean;
        /**
          * Value
         */
        "value": string | number;
    }
    interface P6Spinner {
    }
    interface IntrinsicElements {
        "my-component": MyComponent;
        "p6-button": P6Button;
        "p6-checkbox": P6Checkbox;
        "p6-input": P6Input;
        "p6-link": P6Link;
        "p6-radio": P6Radio;
        "p6-spinner": P6Spinner;
    }
}
export { LocalJSX as JSX };
declare module "@stencil/core" {
    export namespace JSX {
        interface IntrinsicElements {
            "my-component": LocalJSX.MyComponent & JSXBase.HTMLAttributes<HTMLMyComponentElement>;
            "p6-button": LocalJSX.P6Button & JSXBase.HTMLAttributes<HTMLP6ButtonElement>;
            "p6-checkbox": LocalJSX.P6Checkbox & JSXBase.HTMLAttributes<HTMLP6CheckboxElement>;
            "p6-input": LocalJSX.P6Input & JSXBase.HTMLAttributes<HTMLP6InputElement>;
            "p6-link": LocalJSX.P6Link & JSXBase.HTMLAttributes<HTMLP6LinkElement>;
            "p6-radio": LocalJSX.P6Radio & JSXBase.HTMLAttributes<HTMLP6RadioElement>;
            "p6-spinner": LocalJSX.P6Spinner & JSXBase.HTMLAttributes<HTMLP6SpinnerElement>;
        }
    }
}
