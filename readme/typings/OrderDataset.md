```typescript
/**
 * Module order in the homepage.
 */
export interface OrderDataset {
    
    /** Unique module's id. */
    id: string;
    
    /** Module order. */
    order: number;

    /** Module's type, can be "frames", "reports" or "counters". */
    type: string;

    /** Width can be "small", "medium", "large" of "full". */
    width: string;

    /** Height can be "medium", "large" of "full". */
    height: string;

    /** Data to be displayed. */
    data?: any;
}
```