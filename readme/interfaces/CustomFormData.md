```typescript
export interface CustomFormData {

    /** Script to eval. */
    content?: string;

    /** Form inital values. */
    model?: any;

    /** Either the data is being fetch or not. */
    fetching?: boolean;

    /** Either there is an error or not. */
    loadingError?: boolean;
}
```