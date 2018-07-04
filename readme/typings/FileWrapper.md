```typescript
interface FileWrapper {
    sourceFile: File;
    uploadStarted: boolean;
    uploadProgress: number;
    uploadEnded: boolean;
    processSuccess?: boolean;
    processState?: string;
    message?: string;
    createdMessagesIds?: string;
}
```