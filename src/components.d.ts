/* eslint-disable */
/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */
import { IconName, IconPrefix } from "@fortawesome/fontawesome-svg-core";
import { HTMLStencilElement, JSXBase } from "@stencil/core/internal";
import { P6Control } from "~shared/form/control";
import { InvalidEventDetail, ValidEventDetail } from "~shared/form/event";
import { Mode, Position, Size } from "~shared/types";
import { LanguageCode } from "~utils/language";
import { P6ButtonType } from "./components/atoms/p6-button/p6-button";
import { P6CalendarType } from "./components/atoms/p6-calendar/p6-calendar";
import {
  P6InputType,
  P6InputValue,
} from "./components/atoms/p6-input/p6-input";
import { P6LanguageValue } from "./components/atoms/p6-language/p6-language";
import { Target } from "./components/atoms/p6-link/p6-link";
import {
  P6SelectControl,
  P6SelectValue,
} from "./components/atoms/p6-select-native/p6-select-native";
import {
  P6TranslationControl,
  P6TranslationValue,
} from "./components/molecules/p6-translation/p6-translation";
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
  interface P6Calendar {
    /**
     * The color of the field
     */
    color: Mode;
    /**
     * Disabled - If `true`, the user cannot interact with the field.
     */
    disabled: boolean;
    /**
     * Pre-selected end date
     */
    endDate: string | undefined;
    /**
     * Range capability (start and end date/time selection)
     */
    isRange: boolean;
    /**
     * From label
     */
    labelFrom: string;
    /**
     * To label
     */
    labelTo: string;
    /**
     * Maximum date allowed
     */
    maxDate: string | undefined;
    /**
     * Minimum date allowed
     */
    minDate: string | undefined;
    /**
     * Steps for minutes selector
     */
    minuteSteps: number;
    /**
     * The name
     */
    name: string;
    /**
     * Marks the field as read only
     */
    readOnly: boolean;
    /**
     * Required - If `true`, the user must set a value to be valid
     */
    required: boolean;
    /**
     * Pre-selected start date
     */
    startDate: string | undefined;
    /**
     * Type of field (date, time, datetime)
     */
    type: P6CalendarType;
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
  interface P6Empty {}
  interface P6Field {}
  interface P6Form {
    /**
     * Sets or retrieves the name of the object.
     */
    name?: string;
  }
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
  interface P6Hint {
    /**
     * set the mode of the hint
     */
    mode: Mode;
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
    max: number | undefined;
    /**
     * The minimum length or value
     */
    min: number | undefined;
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
    placeholder: string;
    /**
     * marks an element that can't be edited.
     */
    readOnly: boolean;
    /**
     * marks an element that can't be submitted without a value.
     */
    required: boolean;
    /**
     * the content type of the input.
     */
    type: P6InputType;
    /**
     * Returns the error message that would be displayed if the user submits the form, or an empty string if no error message. It also triggers the standard error message, such as "this is a required field".
     */
    validationMessage: () => Promise<string>;
    /**
     * the value of the input.
     */
    value: string | number | undefined;
    /**
     * shows a waiting indicator
     */
    waiting: boolean;
  }
  interface P6Label {}
  interface P6Language {
    /**
     * The select is not available for interaction. The value will not be submitted with the form
     */
    disabled: boolean;
    /**
     * Values to exclude from the language list
     */
    excludes: string[];
    /**
     * The Mode of the component to display
     */
    mode: Mode;
    /**
     * The name
     */
    name: string;
    /**
     * Marks as read only.
     */
    readOnly: boolean;
    /**
     * Marks the select as required. It can't be submitted without a value
     */
    required: boolean;
    /**
     * The size of the component to display
     */
    size: Size;
    /**
     * The selected value
     */
    value: P6LanguageValue;
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
  interface P6Select {
    /**
     * Returns whether a form will validate when it is submitted, without having to submit it.
     */
    checkValidity: () => Promise<boolean>;
    /**
     * The select is not available for interaction. The value will not be submitted with the form
     */
    disabled: boolean;
    /**
     * Marks the select as multiple
     */
    multiple: boolean;
    /**
     * The name of the select
     */
    name: string;
    /**
     * The value of the placeholder to display on the search
     */
    placeholder: string | undefined;
    /**
     * Marks the select as read only.
     */
    readOnly: boolean;
    /**
     * Marks the select as required. It can't be submitted without a value
     */
    required: boolean;
    /**
     * Enable the search on the select
     */
    searchEnabled: boolean;
    /**
     * Sort the options by alphabetic order
     */
    shouldSort: boolean;
    /**
     * The size of the component to display
     */
    size: Size;
    /**
     * Returns the error message that would be displayed if the user submits the form, or an empty string if no error message. It also triggers the standard error message, such as "this is a required field".
     */
    validationMessage: () => Promise<string>;
  }
  interface P6SelectNative {
    /**
     * Returns whether a form will validate when it is submitted, without having to submit it.
     */
    checkValidity: () => Promise<boolean>;
    /**
     * The select is not available for interaction. The value will not be submitted with the form
     */
    disabled: boolean;
    /**
     * The Mode of the component to display
     */
    mode: Mode;
    /**
     * Is multiple
     */
    multiple: boolean;
    /**
     * The name
     */
    name: string;
    /**
     * Marks as read only.
     */
    readOnly: boolean;
    /**
     * Marks the select as required. It can't be submitted without a value
     */
    required: boolean;
    /**
     * The size of the component to display
     */
    size: Size;
    /**
     * Returns the error message that would be displayed if the user submits the form, or an empty string if no error message. It also triggers the standard error message, such as "this is a required field".
     */
    validationMessage: () => Promise<string>;
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
  interface P6Tabs {
    /**
     * Default tab selected.
     */
    selected: string | undefined;
  }
  interface P6Tag {
    /**
     * Mode
     */
    mode: Mode;
    /**
     * Size
     */
    size: Size;
  }
  interface P6Textarea {
    /**
     * Returns whether a form will validate when it is submitted, without having to submit it.
     */
    checkValidity: () => Promise<boolean>;
    /**
     * The number of columns
     */
    cols: number | undefined;
    /**
     * the input is not available for interaction. The value will not be submitted with the form
     */
    disabled: boolean;
    /**
     * The maximum length or value
     */
    max: number | undefined;
    /**
     * The minimum length or value
     */
    min: number | undefined;
    /**
     * The name of the input.
     */
    name: string;
    /**
     * content to be appear in the form control when the form control is empty
     */
    placeholder: string | undefined;
    /**
     * marks an element that can't be edited.
     */
    readOnly: boolean;
    /**
     * marks an element that can't be submitted without a value.
     */
    required: boolean;
    /**
     * The number of rows
     */
    rows: number | undefined;
    /**
     * The size of the component to display
     */
    size: Size;
    /**
     * Returns the error message that would be displayed if the user submits the form, or an empty string if no error message. It also triggers the standard error message, such as "this is a required field".
     */
    validationMessage: () => Promise<string>;
    /**
     * the value of the input.
     */
    value: string | undefined;
    /**
     * shows a waiting indicator
     */
    waiting: boolean;
  }
  interface P6Translation {
    /**
     * Returns whether a form will validate when it is submitted, without having to submit it.
     */
    checkValidity: () => Promise<boolean>;
    /**
     * the input is not available for interaction. The value will not be submitted with the form
     */
    disabled: boolean;
    /**
     * The name
     */
    name: string;
    /**
     * Marks as read only.
     */
    readOnly: boolean;
    /**
     * The size of the component to display
     */
    size: Size;
    /**
     * Returns the error message that would be displayed if the user submits the form, or an empty string if no error message. It also triggers the standard error message, such as "this is a required field".
     */
    validationMessage: () => Promise<string>;
    /**
     * The value
     */
    value: P6TranslationValue;
  }
  interface P6TranslationLine {
    /**
     * Disabled
     */
    disabled: boolean;
    /**
     * The current translation
     */
    excludes: LanguageCode[];
    /**
     * The language
     */
    language: LanguageCode;
    /**
     * The name
     */
    name: string;
    /**
     * Read only
     */
    readOnly: boolean;
    /**
     * The size
     */
    size: Size;
    /**
     * The translation
     */
    translation: string;
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
  interface HTMLP6CalendarElement
    extends Components.P6Calendar,
      HTMLStencilElement {}
  var HTMLP6CalendarElement: {
    prototype: HTMLP6CalendarElement;
    new (): HTMLP6CalendarElement;
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
  interface HTMLP6EmptyElement extends Components.P6Empty, HTMLStencilElement {}
  var HTMLP6EmptyElement: {
    prototype: HTMLP6EmptyElement;
    new (): HTMLP6EmptyElement;
  };
  interface HTMLP6FieldElement extends Components.P6Field, HTMLStencilElement {}
  var HTMLP6FieldElement: {
    prototype: HTMLP6FieldElement;
    new (): HTMLP6FieldElement;
  };
  interface HTMLP6FormElement extends Components.P6Form, HTMLStencilElement {}
  var HTMLP6FormElement: {
    prototype: HTMLP6FormElement;
    new (): HTMLP6FormElement;
  };
  interface HTMLP6HelpElement extends Components.P6Help, HTMLStencilElement {}
  var HTMLP6HelpElement: {
    prototype: HTMLP6HelpElement;
    new (): HTMLP6HelpElement;
  };
  interface HTMLP6HintElement extends Components.P6Hint, HTMLStencilElement {}
  var HTMLP6HintElement: {
    prototype: HTMLP6HintElement;
    new (): HTMLP6HintElement;
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
  interface HTMLP6LabelElement extends Components.P6Label, HTMLStencilElement {}
  var HTMLP6LabelElement: {
    prototype: HTMLP6LabelElement;
    new (): HTMLP6LabelElement;
  };
  interface HTMLP6LanguageElement
    extends Components.P6Language,
      HTMLStencilElement {}
  var HTMLP6LanguageElement: {
    prototype: HTMLP6LanguageElement;
    new (): HTMLP6LanguageElement;
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
  interface HTMLP6SelectElement
    extends Components.P6Select,
      HTMLStencilElement {}
  var HTMLP6SelectElement: {
    prototype: HTMLP6SelectElement;
    new (): HTMLP6SelectElement;
  };
  interface HTMLP6SelectNativeElement
    extends Components.P6SelectNative,
      HTMLStencilElement {}
  var HTMLP6SelectNativeElement: {
    prototype: HTMLP6SelectNativeElement;
    new (): HTMLP6SelectNativeElement;
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
  interface HTMLP6TabsElement extends Components.P6Tabs, HTMLStencilElement {}
  var HTMLP6TabsElement: {
    prototype: HTMLP6TabsElement;
    new (): HTMLP6TabsElement;
  };
  interface HTMLP6TagElement extends Components.P6Tag, HTMLStencilElement {}
  var HTMLP6TagElement: {
    prototype: HTMLP6TagElement;
    new (): HTMLP6TagElement;
  };
  interface HTMLP6TextareaElement
    extends Components.P6Textarea,
      HTMLStencilElement {}
  var HTMLP6TextareaElement: {
    prototype: HTMLP6TextareaElement;
    new (): HTMLP6TextareaElement;
  };
  interface HTMLP6TranslationElement
    extends Components.P6Translation,
      HTMLStencilElement {}
  var HTMLP6TranslationElement: {
    prototype: HTMLP6TranslationElement;
    new (): HTMLP6TranslationElement;
  };
  interface HTMLP6TranslationLineElement
    extends Components.P6TranslationLine,
      HTMLStencilElement {}
  var HTMLP6TranslationLineElement: {
    prototype: HTMLP6TranslationLineElement;
    new (): HTMLP6TranslationLineElement;
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
    "p6-calendar": HTMLP6CalendarElement;
    "p6-checkbox": HTMLP6CheckboxElement;
    "p6-dropdown": HTMLP6DropdownElement;
    "p6-empty": HTMLP6EmptyElement;
    "p6-field": HTMLP6FieldElement;
    "p6-form": HTMLP6FormElement;
    "p6-help": HTMLP6HelpElement;
    "p6-hint": HTMLP6HintElement;
    "p6-icon": HTMLP6IconElement;
    "p6-input": HTMLP6InputElement;
    "p6-label": HTMLP6LabelElement;
    "p6-language": HTMLP6LanguageElement;
    "p6-link": HTMLP6LinkElement;
    "p6-radio": HTMLP6RadioElement;
    "p6-select": HTMLP6SelectElement;
    "p6-select-native": HTMLP6SelectNativeElement;
    "p6-spinner": HTMLP6SpinnerElement;
    "p6-switch": HTMLP6SwitchElement;
    "p6-tabs": HTMLP6TabsElement;
    "p6-tag": HTMLP6TagElement;
    "p6-textarea": HTMLP6TextareaElement;
    "p6-translation": HTMLP6TranslationElement;
    "p6-translation-line": HTMLP6TranslationLineElement;
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
  interface P6Calendar {
    /**
     * The color of the field
     */
    color?: Mode;
    /**
     * Disabled - If `true`, the user cannot interact with the field.
     */
    disabled?: boolean;
    /**
     * Pre-selected end date
     */
    endDate?: string | undefined;
    /**
     * Range capability (start and end date/time selection)
     */
    isRange?: boolean;
    /**
     * From label
     */
    labelFrom?: string;
    /**
     * To label
     */
    labelTo?: string;
    /**
     * Maximum date allowed
     */
    maxDate?: string | undefined;
    /**
     * Minimum date allowed
     */
    minDate?: string | undefined;
    /**
     * Steps for minutes selector
     */
    minuteSteps?: number;
    /**
     * The name
     */
    name: string;
    /**
     * Marks the field as read only
     */
    readOnly?: boolean;
    /**
     * Required - If `true`, the user must set a value to be valid
     */
    required?: boolean;
    /**
     * Pre-selected start date
     */
    startDate?: string | undefined;
    /**
     * Type of field (date, time, datetime)
     */
    type?: P6CalendarType;
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
  interface P6Empty {}
  interface P6Field {}
  interface P6Form {
    /**
     * Sets or retrieves the name of the object.
     */
    name?: string;
    /**
     * Fires when a FORM submitted is valid.
     */
    onP6Submit?: (event: CustomEvent<Map<string, unknown>>) => void;
  }
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
  interface P6Hint {
    /**
     * set the mode of the hint
     */
    mode?: Mode;
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
    max?: number | undefined;
    /**
     * The minimum length or value
     */
    min?: number | undefined;
    /**
     * The name of the input.
     */
    name: string;
    /**
     * Registering the field in a p6-form
     */
    onP6FormRegister?: (event: CustomEvent<P6Control<P6InputValue>>) => void;
    /**
     * Unregistering the field in a p6-form
     */
    onP6FormUnregister?: (event: CustomEvent<P6Control<P6InputValue>>) => void;
    /**
     * Fires when the field has been checked for validity and doesn't satisfy its constraints
     */
    onP6Invalid?: (event: CustomEvent<InvalidEventDetail>) => void;
    /**
     * Fires when the field has been checked for validity and satisfy its constraints
     */
    onP6Valid?: (event: CustomEvent<ValidEventDetail<P6InputValue>>) => void;
    /**
     * Pattern the value must match to be valid.
     */
    pattern?: string | undefined;
    /**
     * content to be appear in the form control when the form control is empty
     */
    placeholder?: string;
    /**
     * marks an element that can't be edited.
     */
    readOnly?: boolean;
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
    value?: string | number | undefined;
    /**
     * shows a waiting indicator
     */
    waiting?: boolean;
  }
  interface P6Label {}
  interface P6Language {
    /**
     * The select is not available for interaction. The value will not be submitted with the form
     */
    disabled?: boolean;
    /**
     * Values to exclude from the language list
     */
    excludes?: string[];
    /**
     * The Mode of the component to display
     */
    mode?: Mode;
    /**
     * The name
     */
    name: string;
    /**
     * When the value change
     */
    onP6Change?: (
      event: CustomEvent<ValidEventDetail<P6LanguageValue>>
    ) => void;
    /**
     * Marks as read only.
     */
    readOnly?: boolean;
    /**
     * Marks the select as required. It can't be submitted without a value
     */
    required?: boolean;
    /**
     * The size of the component to display
     */
    size?: Size;
    /**
     * The selected value
     */
    value?: P6LanguageValue;
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
  interface P6Select {
    /**
     * The select is not available for interaction. The value will not be submitted with the form
     */
    disabled?: boolean;
    /**
     * Marks the select as multiple
     */
    multiple?: boolean;
    /**
     * The name of the select
     */
    name: string;
    /**
     * The value of the placeholder to display on the search
     */
    placeholder?: string | undefined;
    /**
     * Marks the select as read only.
     */
    readOnly?: boolean;
    /**
     * Marks the select as required. It can't be submitted without a value
     */
    required?: boolean;
    /**
     * Enable the search on the select
     */
    searchEnabled?: boolean;
    /**
     * Sort the options by alphabetic order
     */
    shouldSort?: boolean;
    /**
     * The size of the component to display
     */
    size?: Size;
  }
  interface P6SelectNative {
    /**
     * The select is not available for interaction. The value will not be submitted with the form
     */
    disabled?: boolean;
    /**
     * The Mode of the component to display
     */
    mode?: Mode;
    /**
     * Is multiple
     */
    multiple?: boolean;
    /**
     * The name
     */
    name: string;
    /**
     * When the value change
     */
    onP6Change?: (event: CustomEvent<ValidEventDetail<P6SelectValue>>) => void;
    /**
     * When the select ask to register
     */
    onP6FormRegister?: (event: CustomEvent<P6SelectControl>) => void;
    /**
     * When the select ask to unregister
     */
    onP6FormUnregister?: (event: CustomEvent<P6SelectControl>) => void;
    /**
     * When the select is invalid
     */
    onP6Invalid?: (event: CustomEvent<InvalidEventDetail>) => void;
    /**
     * When the select is valid
     */
    onP6Valid?: (event: CustomEvent<ValidEventDetail<P6SelectValue>>) => void;
    /**
     * Marks as read only.
     */
    readOnly?: boolean;
    /**
     * Marks the select as required. It can't be submitted without a value
     */
    required?: boolean;
    /**
     * The size of the component to display
     */
    size?: Size;
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
  interface P6Tabs {
    /**
     * Default tab selected.
     */
    selected?: string | undefined;
  }
  interface P6Tag {
    /**
     * Mode
     */
    mode?: Mode;
    /**
     * Size
     */
    size?: Size;
  }
  interface P6Textarea {
    /**
     * The number of columns
     */
    cols?: number | undefined;
    /**
     * the input is not available for interaction. The value will not be submitted with the form
     */
    disabled?: boolean;
    /**
     * The maximum length or value
     */
    max?: number | undefined;
    /**
     * The minimum length or value
     */
    min?: number | undefined;
    /**
     * The name of the input.
     */
    name: string;
    /**
     * content to be appear in the form control when the form control is empty
     */
    placeholder?: string | undefined;
    /**
     * marks an element that can't be edited.
     */
    readOnly?: boolean;
    /**
     * marks an element that can't be submitted without a value.
     */
    required?: boolean;
    /**
     * The number of rows
     */
    rows?: number | undefined;
    /**
     * The size of the component to display
     */
    size?: Size;
    /**
     * the value of the input.
     */
    value?: string | undefined;
    /**
     * shows a waiting indicator
     */
    waiting?: boolean;
  }
  interface P6Translation {
    /**
     * the input is not available for interaction. The value will not be submitted with the form
     */
    disabled?: boolean;
    /**
     * The name
     */
    name: string;
    /**
     * When the select ask to register
     */
    onP6FormRegister?: (event: CustomEvent<P6TranslationControl>) => void;
    /**
     * When the select ask to unregister
     */
    onP6FormUnregister?: (event: CustomEvent<P6TranslationControl>) => void;
    /**
     * When the field is invalid
     */
    onP6Invalid?: (event: CustomEvent<InvalidEventDetail>) => void;
    /**
     * When the field is valid
     */
    onP6Valid?: (
      event: CustomEvent<ValidEventDetail<P6TranslationValue>>
    ) => void;
    /**
     * Marks as read only.
     */
    readOnly?: boolean;
    /**
     * The size of the component to display
     */
    size?: Size;
    /**
     * The value
     */
    value?: P6TranslationValue;
  }
  interface P6TranslationLine {
    /**
     * Disabled
     */
    disabled: boolean;
    /**
     * The current translation
     */
    excludes?: LanguageCode[];
    /**
     * The language
     */
    language: LanguageCode;
    /**
     * The name
     */
    name: string;
    onP6Delete?: (event: CustomEvent<void>) => void;
    onP6KeyChange?: (
      event: CustomEvent<ValidEventDetail<LanguageCode>>
    ) => void;
    onP6ValueChange?: (event: CustomEvent<ValidEventDetail<string>>) => void;
    /**
     * Read only
     */
    readOnly: boolean;
    /**
     * The size
     */
    size: Size;
    /**
     * The translation
     */
    translation: string;
  }
  interface P6Waiting {}
  interface IntrinsicElements {
    "p6-action": P6Action;
    "p6-button": P6Button;
    "p6-calendar": P6Calendar;
    "p6-checkbox": P6Checkbox;
    "p6-dropdown": P6Dropdown;
    "p6-empty": P6Empty;
    "p6-field": P6Field;
    "p6-form": P6Form;
    "p6-help": P6Help;
    "p6-hint": P6Hint;
    "p6-icon": P6Icon;
    "p6-input": P6Input;
    "p6-label": P6Label;
    "p6-language": P6Language;
    "p6-link": P6Link;
    "p6-radio": P6Radio;
    "p6-select": P6Select;
    "p6-select-native": P6SelectNative;
    "p6-spinner": P6Spinner;
    "p6-switch": P6Switch;
    "p6-tabs": P6Tabs;
    "p6-tag": P6Tag;
    "p6-textarea": P6Textarea;
    "p6-translation": P6Translation;
    "p6-translation-line": P6TranslationLine;
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
      "p6-calendar": LocalJSX.P6Calendar &
        JSXBase.HTMLAttributes<HTMLP6CalendarElement>;
      "p6-checkbox": LocalJSX.P6Checkbox &
        JSXBase.HTMLAttributes<HTMLP6CheckboxElement>;
      "p6-dropdown": LocalJSX.P6Dropdown &
        JSXBase.HTMLAttributes<HTMLP6DropdownElement>;
      "p6-empty": LocalJSX.P6Empty & JSXBase.HTMLAttributes<HTMLP6EmptyElement>;
      "p6-field": LocalJSX.P6Field & JSXBase.HTMLAttributes<HTMLP6FieldElement>;
      "p6-form": LocalJSX.P6Form & JSXBase.HTMLAttributes<HTMLP6FormElement>;
      "p6-help": LocalJSX.P6Help & JSXBase.HTMLAttributes<HTMLP6HelpElement>;
      "p6-hint": LocalJSX.P6Hint & JSXBase.HTMLAttributes<HTMLP6HintElement>;
      "p6-icon": LocalJSX.P6Icon & JSXBase.HTMLAttributes<HTMLP6IconElement>;
      "p6-input": LocalJSX.P6Input & JSXBase.HTMLAttributes<HTMLP6InputElement>;
      "p6-label": LocalJSX.P6Label & JSXBase.HTMLAttributes<HTMLP6LabelElement>;
      "p6-language": LocalJSX.P6Language &
        JSXBase.HTMLAttributes<HTMLP6LanguageElement>;
      "p6-link": LocalJSX.P6Link & JSXBase.HTMLAttributes<HTMLP6LinkElement>;
      "p6-radio": LocalJSX.P6Radio & JSXBase.HTMLAttributes<HTMLP6RadioElement>;
      "p6-select": LocalJSX.P6Select &
        JSXBase.HTMLAttributes<HTMLP6SelectElement>;
      "p6-select-native": LocalJSX.P6SelectNative &
        JSXBase.HTMLAttributes<HTMLP6SelectNativeElement>;
      "p6-spinner": LocalJSX.P6Spinner &
        JSXBase.HTMLAttributes<HTMLP6SpinnerElement>;
      "p6-switch": LocalJSX.P6Switch &
        JSXBase.HTMLAttributes<HTMLP6SwitchElement>;
      "p6-tabs": LocalJSX.P6Tabs & JSXBase.HTMLAttributes<HTMLP6TabsElement>;
      "p6-tag": LocalJSX.P6Tag & JSXBase.HTMLAttributes<HTMLP6TagElement>;
      "p6-textarea": LocalJSX.P6Textarea &
        JSXBase.HTMLAttributes<HTMLP6TextareaElement>;
      "p6-translation": LocalJSX.P6Translation &
        JSXBase.HTMLAttributes<HTMLP6TranslationElement>;
      "p6-translation-line": LocalJSX.P6TranslationLine &
        JSXBase.HTMLAttributes<HTMLP6TranslationLineElement>;
      "p6-waiting": LocalJSX.P6Waiting &
        JSXBase.HTMLAttributes<HTMLP6WaitingElement>;
    }
  }
}
