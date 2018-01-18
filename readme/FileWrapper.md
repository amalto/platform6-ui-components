```typescript
interface FileWrapper {
   
    /** File content. */
    sourceFile: File;
    
    /** Wether the file upload has started or not. */
    uploadStarted: boolean;

    /** Upload progress in %. */
    uploadProgress: number;

    /** Wether the file upload is finished or not. */
    uploadEnded: boolean;

    /** */
    processSuccess?: boolean;

    /** */
    processState?: string;

    /** */
    message?: string;

    /** */
    createdMessagesIds?: string;
}
```