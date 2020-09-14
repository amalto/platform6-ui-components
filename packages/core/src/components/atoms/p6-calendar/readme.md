# p6-calendar

<!-- Auto Generated Below -->

## Properties

| Property            | Attribute     | Description                                                    | Type                                                                                       | Default     |
| ------------------- | ------------- | -------------------------------------------------------------- | ------------------------------------------------------------------------------------------ | ----------- |
| `color`             | `color`       | The color of the field                                         | `Mode.danger \| Mode.default \| Mode.info \| Mode.primary \| Mode.success \| Mode.warning` | `Mode.info` |
| `disabled`          | `disabled`    | Disabled - If `true`, the user cannot interact with the field. | `boolean`                                                                                  | `false`     |
| `endDate`           | `enddate`     | Pre-selected end date                                          | `string \| undefined`                                                                      | `undefined` |
| `isRange`           | `isrange`     | Range capability (start and end date/time selection)           | `boolean`                                                                                  | `false`     |
| `labelFrom`         | `labelfrom`   | From label                                                     | `string`                                                                                   | `''`        |
| `labelTo`           | `labelto`     | To label                                                       | `string`                                                                                   | `''`        |
| `maxDate`           | `maxdate`     | Maximum date allowed                                           | `string \| undefined`                                                                      | `undefined` |
| `minDate`           | `mindate`     | Minimum date allowed                                           | `string \| undefined`                                                                      | `undefined` |
| `minuteSteps`       | `minutesteps` | Steps for minutes selector                                     | `number`                                                                                   | `5`         |
| `name` _(required)_ | `name`        | The name                                                       | `string`                                                                                   | `undefined` |
| `readOnly`          | `readonly`    | Marks the field as read only                                   | `boolean`                                                                                  | `false`     |
| `required`          | `required`    | Required - If `true`, the user must set a value to be valid    | `boolean`                                                                                  | `false`     |
| `startDate`         | `startdate`   | Pre-selected start date                                        | `string \| undefined`                                                                      | `undefined` |
| `type`              | `type`        | Type of field (date, time, datetime)                           | `"date" \| "datetime" \| "time"`                                                           | `'date'`    |

---

_Built with [StencilJS](https://stenciljs.com/)_
