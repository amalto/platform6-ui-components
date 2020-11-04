# p6-input

<!-- Auto Generated Below -->

## Properties

| Property                   | Attribute     | Description                                                                                                                                                                | Type                                                                                       | Default        |
| -------------------------- | ------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------ | -------------- |
| `accept`                   | `accept`      | A string that defines the file types the file input should accept. This string is a comma-separated list of filename extension or MIME type example : ".jpg,.png,image/\*" | `string \| undefined`                                                                      | `undefined`    |
| `disabled`                 | `disabled`    | the input is not available for interaction. The value will not be submitted with the form                                                                                  | `boolean`                                                                                  | `false`        |
| `mode`                     | `mode`        | set the mode of the button                                                                                                                                                 | `Mode.danger \| Mode.default \| Mode.info \| Mode.primary \| Mode.success \| Mode.warning` | `Mode.default` |
| `name` _(required)_        | `name`        | The name of the input.                                                                                                                                                     | `string`                                                                                   | `undefined`    |
| `outlined`                 | `outlined`    | Outlined                                                                                                                                                                   | `boolean`                                                                                  | `false`        |
| `placeholder` _(required)_ | `placeholder` | content to be appear in the form control when the form control is empty                                                                                                    | `string`                                                                                   | `undefined`    |
| `required`                 | `required`    | marks an element that can't be submitted without a value.                                                                                                                  | `boolean`                                                                                  | `false`        |
| `size`                     | `size`        | set the size of the button                                                                                                                                                 | `Size.normal \| Size.small`                                                                | `Size.normal`  |
| `value`                    | `value`       | the value of the input.                                                                                                                                                    | `string \| undefined`                                                                      | `undefined`    |

## Events

| Event              | Description                                                                            | Type                                         |
| ------------------ | -------------------------------------------------------------------------------------- | -------------------------------------------- |
| `p6Change`         | Fires after the selection of the files                                                 | `CustomEvent<File[]>`                        |
| `p6FormRegister`   | Registering the field in a p6-form                                                     | `CustomEvent<P6Control<P6FileValue>>`        |
| `p6FormUnregister` | Unregistering the field in a p6-form                                                   | `CustomEvent<P6Control<P6FileValue>>`        |
| `p6Invalid`        | Fires when the field has been checked for validity and doesn't satisfy its constraints | `CustomEvent<InvalidEventDetail>`            |
| `p6Valid`          | Fires when the field has been checked for validity and satisfy its constraints         | `CustomEvent<ValidEventDetail<P6FileValue>>` |

## Methods

### `checkValidity() => Promise<boolean>`

Returns whether a form will validate when it is submitted, without having to submit it.

#### Returns

Type: `Promise<boolean>`

### `reset() => Promise<boolean>`

Restores the input's default value

#### Returns

Type: `Promise<boolean>`

### `validationMessage() => Promise<string>`

Returns the error message that would be displayed if the user submits the form, or an empty string if no error message.
It also triggers the standard error message, such as "this is a required field".

#### Returns

Type: `Promise<string>`

---

_Built with [StencilJS](https://stenciljs.com/)_
