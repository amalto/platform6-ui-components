File handlers.

```typescript
/**
 * Download JSON file.
 * @param { any } data - JSON object to save.
 * @param { string } fileName - File name of the data to be save at.
 */
function saveDataAsJSONFile( data: any, fileName: string ): void;

/**
 * Download file with defined type.
 * @param { string } base64DataString - Data to be downloaded.
 * @param { string } contentType - Type of the data to download.
 * @param { string } fileName - Name to save the downloaded data at.
 */
function downloadDataFile( base64DataString: string, contentType: string, fileName: string ): void;

/**
 * Trigger download from browser.
 * @param { Blob | string } data - Data to download.
 * @param { string } fileName - Name to save the downloaded data at.
 * @param { boolean } [dataUrl] - If true, data will be considered as an url.
 */
function triggerDataDownload( data: Blob | string, fileName: string, dataUrl?: boolean ): void;
```