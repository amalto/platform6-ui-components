# p6-input

<!-- Auto Generated Below -->

## Properties

| Property            | Attribute     | Description                                                                               | Type                                                                                                                                              | Default            |
| ------------------- | ------------- | ----------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------ |
| `disabled`          | `disabled`    | the input is not available for interaction. The value will not be submitted with the form | `boolean`                                                                                                                                         | `false`            |
| `max`               | `max`         | The maximum length or value                                                               | `number \| undefined`                                                                                                                             | `undefined`        |
| `min`               | `min`         | The minimum length or value                                                               | `number \| undefined`                                                                                                                             | `undefined`        |
| `name` _(required)_ | `name`        | The name of the input.                                                                    | `string`                                                                                                                                          | `undefined`        |
| `pattern`           | `pattern`     | Pattern the value must match to be valid.                                                 | `string \| undefined`                                                                                                                             | `undefined`        |
| `placeholder`       | `placeholder` | content to be appear in the form control when the form control is empty                   | `string`                                                                                                                                          | `''`               |
| `readOnly`          | `readonly`    | marks an element that can't be edited.                                                    | `boolean`                                                                                                                                         | `false`            |
| `required`          | `required`    | marks an element that can't be submitted without a value.                                 | `boolean`                                                                                                                                         | `false`            |
| `type`              | `type`        | the content type of the input.                                                            | `P6InputType.email \| P6InputType.number \| P6InputType.password \| P6InputType.search \| P6InputType.tel \| P6InputType.text \| P6InputType.url` | `P6InputType.text` |
| `value`             | `value`       | the value of the input.                                                                   | `number \| string \| undefined`                                                                                                                   | `undefined`        |
| `waiting`           | `waiting`     | shows a waiting indicator                                                                 | `boolean`                                                                                                                                         | `false`            |

## Events

| Event              | Description                                                                            | Type                                                           |
| ------------------ | -------------------------------------------------------------------------------------- | -------------------------------------------------------------- |
| `p6FormRegister`   | Registering the field in a p6-form                                                     | `CustomEvent<P6Control<string \| number \| undefined>>`        |
| `p6FormUnregister` | Unregistering the field in a p6-form                                                   | `CustomEvent<P6Control<string \| number \| undefined>>`        |
| `p6Invalid`        | Fires when the field has been checked for validity and doesn't satisfy its constraints | `CustomEvent<InvalidEventDetail>`                              |
| `p6Valid`          | Fires when the field has been checked for validity and satisfy its constraints         | `CustomEvent<ValidEventDetail<string \| number \| undefined>>` |

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
