```typescript
interface ColumnHeader {

    /** Column id. */
    id: string | number;

    /** Header label. */
    label: string | JSX.Element;

    /** Column is displayable or not. */
    display?: boolean;

    /** Column order. */
    order?: number;

    /** Text color. */
    color?: string;

    /** Column width. */
    width?: number;

    /** Text alignement. */
    textAlign?: string;

    /** Disable onClick event on header. */
    disableClick?: boolean;
}
```