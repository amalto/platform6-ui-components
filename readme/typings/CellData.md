```typescript
/**
 * Signature of a singe cell.
 */
interface CellData {

    /** Value displayed. */
    displayValue: JSX.Element | string;

    /** Unique Id corresponding to a "ColumnHeader". */
    columnId: string;
    
    /** Css class like "multiline" which allow cell to display content on multiples lines. */
    cssClass?: string;

    /** Is the cell visible. */
    display?: boolean;

    /** Is cell editable. */
    readOnly?: boolean;

    /** Is cell being edited. */
    isEdited?: boolean;

    /** Is the cell the last editable. */
    lastEditable?: boolean;

    /**
     * If provided the cell will be a "select" instead of an "input".
     */
    options?: {
        value: string | number;
        label?: string;
        disabled?: boolean;
    }[];

    /**
     * Function validating the input value.
     * It should return "undefined" if valid and a "string" explaining the invalidity.
     */
    validate?: ( value: string ) => any;
}
```