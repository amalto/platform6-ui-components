These functions are part of the helpers module.

```typescript
/** Select the wordings based on locale */
function compileWordings( wordings: { [key: string]: any }, locale: string ): { [key: string]: string };

/** at least it has an "@" and a "." in it... */
function isValidEmail( email: string ): boolean;

/** check for an hex color code like #fff or #ffffff */
function isValidColorCode( color: string ): boolean;

/** Check if a string is not empty or full of whitespaces */
function isNotEmpty( value: string ): boolean;

/** check for a valid scope keyword value (see "Scopes and Permissions" page on confluence) */
function isValidScopeKeyword( value: string ): boolean;

/** check for a valid object key char */
function isValidKeyChar( value: string ): boolean;

/** check for a valid XML Tag */
function isValidXMLTag( value: string ): boolean;

/** Check for a valid https url */
function isValidHttpsUrl( value: string ): boolean;

function escapeXml( xml: string ): string;

/** Return a valid URI encoded base64 data from JSON */
function utf8JSON_to_b64URI( json ): string;

/** Return a valid stringify JSON object from a base64 URI */
function URIb64_to_utf8JSON( str ): string;

/** Get minimum from array */
function arrayMin( arr: number[] ): number;

/** Get maximum from array */
function arrayMax( arr: number[] ): number;

/** Return best file format depending on the size between 'B', 'KB', 'MB', 'GB', 'TB' */
function formatFileSize( size: number ): string;

/** Returns a key-value object from a query string like ?test=value&other=something */
function getQueryParams( searchString: string ): any;

/**
 * Adds a query parameter to a URI (string)
 * returns an HTMLAnchorElement
 */
function addQueryParam( uri: string, key: string, value: any ): HTMLAnchorElement;

/**
 * Inverts search and fragment of a RFC 3986 URL , allowing react router to properly get query params...
 */
function buildReactRouterUri( uri: string ): string;

/** return the same object passed as param but with ASC ordered keys */
function orderAsc( object: Object ): Object;

/** return the same object passed as param but with DESC ordered keys */
function orderDesc( object: Object ): Object;

/** Download JSON file */
function saveDataAsJSONFile( data: any, fileName: string ): void;

/** Download file with defined type */
function downloadDataFile( base64DataString: string, contentType: string, fileName: string ): void;

/** Trigger download from browser */
function triggerDataDownload( data: Blob | string, fileName: string, dataUrl?: boolean ): void;

function loadTooltips( element: Element ): void;

function unloadTooltips( element: Element ): void;

/** Return an array of every value in the list array corresponding to the propertyName */
function groupByProperty( list: any[], propertyName: string ): { [propValue: string]: any[] };

/** Add an element to array only if there is no duplicate */
function addValToArrayNoDup( array: string[], value: string ): string[];

/** Remove every element to array corresponding to value */
function removeValFromArrayNoDup( array: string[], value: string ): string[];

/** Get value from keyPath */
function getNestedValue( obj: any, keyPath: string ): any;

function filterCollection( collection: any[], properties: string[], searchString: string ): any[];

function base64Decode( encodedData: string ): string;
```