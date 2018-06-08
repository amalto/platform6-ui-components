```typescript
interface CellData {

    /** Cell to display.  */
    displayValue: JSX.Element | string;

    /** Column id corresponding to the header id. */
    columnId: string;

    /** Container CSS class. */
    cssClass?: string;

    /** Is displayed. */
    display?: boolean;

    /** Cell is editable or not. */
    readOnly?: boolean;
    
    /** Cell has been edited by user input. */
    isEdited?: boolean;

    /** If is the last cell the user can edit. */
    lastEditable?: boolean;

    /** If true, double clicking on a readonly cell will transform it into a disabled "textarea". */
    allowDisplayAsTextAreaOnReadonly?: boolean;

    /** If provided, in edit mode cell will be a "select" instead of an "text" input. */
    options?: {
        value: string | number;
        label?: string;
        disabled?: boolean;
    }[];

    /** Validate method on input. */
    validate?: ( value: string ) => any;
}
```