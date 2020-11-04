# p6-tab

<!-- Auto Generated Below -->

## Properties

| Property    | Attribute   | Description           | Type      | Default |
| ----------- | ----------- | --------------------- | --------- | ------- |
| `active`    | `active`    | Set the tab active    | `boolean` | `false` |
| `closeable` | `closeable` | Set the tab closeable | `boolean` | `false` |
| `closed`    | `closed`    | Set the tab hidden    | `boolean` | `false` |

## Events

| Event     | Description                        | Type                   |
| --------- | ---------------------------------- | ---------------------- |
| `p6Close` | Fires when the tab has been closed | `CustomEvent<boolean>` |

## Methods

### `close() => Promise<void>`

Closes the tab if closeable

#### Returns

Type: `Promise<void>`

---

_Built with [StencilJS](https://stenciljs.com/)_
