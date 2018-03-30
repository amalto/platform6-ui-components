Methods returning formatted strings.

More informations on `dateByLocalToString` options [here](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleString).

```typescript

/**
 * Return gravater linked to use email.
 * @param { string } email - User email.
 */
function getGravatarUrl( email: string ): string;

/**
 * Escape xml.
 * @param { string } xml - String to be escaped.
 */
function escapeXml( xml: string ): string;

/**
 * Return a valid URI encoded base64 data from JSON.
 * @param { JSON Object } json - Json object to convert.
 */
function utf8JSON_to_b64URI( json ): string;

/**
 * Return a valid stringify JSON object from a base64 URI.
 * @param { string } str - String to convert.
 */
function URIb64_to_utf8JSON( str: string ): string;

/**
 * Return best file format depending on the size between 'B', 'KB', 'MB', 'GB', 'TB'.
 * @param { number } size - Size to process.
 */
function formatFileSize( size: number ): string;

/**
 * Inverts search and fragment of a RFC 3986 URL ,
 * allowing react router to properly get query params...
 * @param { string } uri - String to process.
 */
function buildReactRouterUri( uri: string ): string;

/**
 * Decode base64 string.
 * @param { string } encodedData - Base64 string to decode.
 */
function base64Decode( encodedData: string ): string;

/**
 * Compare name with a string array and return a new name
 * if it's a duplicate.
 * @param { string } name - Name wanted.
 * @param { string[] } container - List of unavailables names.
 */
function handleDuplicateNameFromArray( name: string, container: string[]): string;

/**
 * Return a date string from timestamp and locale.
 * @param { string } locale - Locale to be used.
 * @param { number } date - Timestamp to be converted.
 * @param { Intl.DateTimeFormatOptions } options - Date options.
 */
function dateByLocalToString( locale: string, date: number, options?: Intl.DateTimeFormatOptions ): string;
```