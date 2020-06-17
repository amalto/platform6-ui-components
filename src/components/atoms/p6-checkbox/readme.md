# p6-checkbox

<!-- Auto Generated Below -->


## Properties

| Property            | Attribute  | Description                | Type                                                                                       | Default        |
| ------------------- | ---------- | -------------------------- | ------------------------------------------------------------------------------------------ | -------------- |
| `checked`           | `checked`  | Initial value              | `boolean`                                                                                  | `false`        |
| `disabled`          | `disabled` | Disable                    | `boolean`                                                                                  | `false`        |
| `mode`              | `mode`     | set the mode of the action | `Mode.danger \| Mode.default \| Mode.info \| Mode.primary \| Mode.success \| Mode.warning` | `Mode.default` |
| `name` _(required)_ | `name`     | Checkbox name              | `string`                                                                                   | `undefined`    |
| `size`              | `size`     | set the size of the action | `Size.large \| Size.medium \| Size.normal \| Size.small`                                   | `Size.normal`  |

## Events

| Event              | Description                                                                            | Type                                             |
| ------------------ | -------------------------------------------------------------------------------------- | ------------------------------------------------ |
| `p6FormRegister`   | Registering the field in a p6-form                                                     | `CustomEvent<P6Control<P6CheckboxValue>>`        |
| `p6FormUnregister` | Unregistering the field in a p6-form                                                   | `CustomEvent<P6Control<P6CheckboxValue>>`        |
| `p6Invalid`        | Fires when the field has been checked for validity and doesn't satisfy its constraints | `CustomEvent<InvalidEventDetail>`                |
| `p6Valid`          | Fires when the field has been checked for validity and satisfy its constraints         | `CustomEvent<ValidEventDetail<P6CheckboxValue>>` |

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


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
