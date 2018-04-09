```typescript

/**
 * Error stacktrace to be displayed.
 */
export declare type B2ResourceException = any

/**
 * Batch of operations status.
 */
export interface MultiProcessingErrors {
    /** The number of items processed. */
    processed: number;

    /** The errors generated during a process. */
    errors: { [id: string]: B2ResourceException };
    
    /** The message which describes the process executed. */
    message: string;
}
```