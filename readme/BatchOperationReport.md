```typescript
export interface BatchOperationReport {
    processed: number;
    errors: {
        [itemId: string]: {
            cause: string;
            stackTrace: {
                methodName: string;
                fileName: string;
                lineNumber: number;
                className: string;
                nativeMethod: boolean
            }[];
            status: number | string;
            code: number | string;
            link: string;
            developerMessage: string;
            message: string;
            conflictInformation: any[];
            localizedMessage: string;
            suppressed: any[];
        }
    }
    message: string;
}
```