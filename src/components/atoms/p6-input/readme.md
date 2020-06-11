# p6-input

<!-- Auto Generated Below -->


## Properties

| Property            | Attribute     | Description                                                                               | Type                                                                        | Default     |
| ------------------- | ------------- | ----------------------------------------------------------------------------------------- | --------------------------------------------------------------------------- | ----------- |
| `disabled`          | `disabled`    | the input is not available for interaction. The value will not be submitted with the form | `boolean`                                                                   | `false`     |
| `max`               | `max`         | The maximum length or value                                                               | `string \| undefined`                                                       | `undefined` |
| `min`               | `min`         | The minimum length or value                                                               | `string \| undefined`                                                       | `undefined` |
| `multiline`         | `multiline`   | Enables multiline support (with a textarea instead of an input)                           | `boolean`                                                                   | `false`     |
| `name` _(required)_ | `name`        | The name of the input.                                                                    | `string`                                                                    | `undefined` |
| `pattern`           | `pattern`     | Pattern the value must match to be valid.                                                 | `string \| undefined`                                                       | `undefined` |
| `placeholder`       | `placeholder` | content to be appear in the form control when the form control is empty                   | `string \| undefined`                                                       | `undefined` |
| `readonly`          | `readonly`    | marks an element that can't be edited.                                                    | `boolean`                                                                   | `false`     |
| `required`          | `required`    | marks an element that can't be submitted without a value.                                 | `boolean`                                                                   | `false`     |
| `type`              | `type`        | the content type of the input.                                                            | `"email" \| "number" \| "password" \| "search" \| "tel" \| "text" \| "url"` | `"text"`    |
| `value`             | `value`       | the value of the input.                                                                   | `string \| undefined`                                                       | `undefined` |
| `waiting`           | `waiting`     | shows a waiting indicator                                                                 | `boolean`                                                                   | `false`     |


## Methods

### `checkValidity() => Promise<boolean>`

Returns whether a form will validate when it is submitted, without having to submit it.

#### Returns

Type: `Promise<boolean>`




----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
