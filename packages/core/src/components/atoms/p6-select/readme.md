# p6-select

<!-- Auto Generated Below -->

## Properties

| Property            | Attribute       | Description                                                                                | Type                  | Default     |
| ------------------- | --------------- | ------------------------------------------------------------------------------------------ | --------------------- | ----------- |
| `disableSearch`     | `disablesearch` | Disable the search on the select                                                           | `boolean`             | `false`     |
| `disabled`          | `disabled`      | The select is not available for interaction. The value will not be submitted with the form | `boolean`             | `false`     |
| `multiple`          | `multiple`      | Marks the select as multiple                                                               | `boolean`             | `false`     |
| `name` _(required)_ | `name`          | The name of the select                                                                     | `string`              | `undefined` |
| `placeholder`       | `placeholder`   | The value of the placeholder to display on the search                                      | `string \| undefined` | `undefined` |
| `readOnly`          | `readonly`      | Marks the select as read only.                                                             | `boolean`             | `false`     |
| `required`          | `required`      | Marks the select as required. It can't be submitted without a value                        | `boolean`             | `false`     |
| `shouldSort`        | `shouldsort`    | Sort the options by alphabetic order                                                       | `boolean`             | `false`     |

## Methods

### `checkValidity() => Promise<boolean>`

Returns whether a form will validate when it is submitted, without having to submit it.

#### Returns

Type: `Promise<boolean>`

### `validationMessage() => Promise<string>`

Returns the error message that would be displayed if the user submits the form, or an empty string if no error message.
It also triggers the standard error message, such as "this is a required field".

#### Returns

Type: `Promise<string>`

---

_Built with [StencilJS](https://stenciljs.com/)_
