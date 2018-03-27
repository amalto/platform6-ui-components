Order of the module display on the Home page.

```typescript
export interface OrderDataset {
    
    /** Unique id. */
    id: string;

    /** Module order. */
    order: number;

    /**
     * Type of the module display.
     * FRAME | COUNTER | REPORT
     */
    type: string;

    /** Module width. */
    width: string;

    /** Module height. */
    height: string;

    /** Data to be displayed depending on module type. */
    data?: any;
}
```