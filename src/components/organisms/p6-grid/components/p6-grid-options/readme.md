# p6-grid-options

<!-- Auto Generated Below -->

## Properties

| Property               | Attribute | Description          | Type                                | Default     |
| ---------------------- | --------- | -------------------- | ----------------------------------- | ----------- |
| `columns` _(required)_ | --        | List of grid columns | `Column<Record<string, unknown>>[]` | `undefined` |

## Events

| Event          | Description                         | Type                                                      |
| -------------- | ----------------------------------- | --------------------------------------------------------- |
| `p6ShowColumn` | Update the visibility of the column | `CustomEvent<ColumnEventDetail<Record<string, unknown>>>` |

## Dependencies

### Used by

- [p6-grid](../..)

### Depends on

- [p6-tag](../../../../atoms/p6-tag)

### Graph

```mermaid
graph TD;
  p6-grid-options --> p6-tag
  p6-grid --> p6-grid-options
  style p6-grid-options fill:#f9f,stroke:#333,stroke-width:4px
```

---

_Built with [StencilJS](https://stenciljs.com/)_
