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

    /** File upload successful. */
    processSuccess?: boolean;

    /** File upload state, could be WARNING or ERROR. */
    processState?: string;

    /** Displayed if processSuccess is set to false. */
    message?: string;

    /** Don't know what it is used for now. */
    createdMessagesIds?: string;
}
```