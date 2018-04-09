```typescript
/**
 * Signature of a single header cell.
 */
interface ColumnHeader {

    /** Unique Id. */
    id: string | number;

    /** Header title. */
    label: string | JSX.Element;

    /** Is column displayable. */
    display?: boolean;

    /** Column order. */
    order?: number;

    /** Text color in hexadecimal. */
    color?: string;

    /** Column width in pixels. */
    width?: number;

    /** Text alignement between "left", "center" and "right". */
    textAlign?: string;

    /** Disable sorting and customization. */
    disableClick?: boolean;
}
```