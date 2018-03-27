Method manipulating URI.

```typescript
/**
 * Returns a key-value object from a query string like ?test=value&other=something.
 * @param { string } searchString - String to process.
 */
function getQueryParams( searchString: string ): any;

/**
 * Adds a query parameter to a URI (string).
 * returns an HTMLAnchorElement.
 * @param { string } uri - Uri to updated.
 * @param { string } key - Query key.
 * @param { any } value - Query value.
 */
function addQueryParam( uri: string, key: string, value: any ): HTMLAnchorElement;
```