```typescript
interface PDFSource {

    /** Resource url. */
    url?: string;
    
    /** Encoded pdf data. */
    data?: Uint8Array;
    
    /** Http header if needed. */
    httpHeaders?: any;
    
    /** Password to open the pdf if there is any. */
	password?: string;
}
```