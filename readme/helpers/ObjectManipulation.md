Methods manipulating objects.

```typescript
/**
 * Select the wordings based on locale.
 * @param { Object } wordings - Object containing all wordings and their translations.
 * @param { string } locale - String used to extract wordings from the wanted language.
 */
function compileWordings( wordings: { [key: string]: any }, locale: string ): { [key: string]: string };

/**
 * Get minimum from array.
 * @param { number[] } arr - Array to process.
 */
function arrayMin( arr: number[] ): number;

/**
 * Get maximum from array.
 * @param { number[] } arr - Array to process.
 */
function arrayMax( arr: number[] ): number;

/**
 * Return the same object passed as param but with ASC ordered keys.
 * @param { Object } object - Object to order.
 */
function orderAsc( object: Object ): Object;

/**
 * Return the same object passed as param but with DESC ordered keys.
 * @param { Object } object - Object to order.
 */
function orderDesc( object: Object ): Object;

/**
 * Return an array of every value in the list array corresponding to the propertyName.
 * @param { any[] } list - Array to process.
 * @param { string } propertyName - String to group list by.
 */
function groupByProperty( list: any[], propertyName: string ): { [propValue: string]: any[] };

/**
 * Add an element to array only if there is no duplicate.
 * @param { string[] } array - Array to process.
 * @param { string } value - String to add.
 */
function addValToArrayNoDup( array: string[], value: string ): string[];

/**
 * Remove every element to array corresponding to value.
 * @param { string[] } array - Array to process.
 * @param { string } value - String to remove.
 */
function removeValFromArrayNoDup( array: string[], value: string ): string[];

/**
 * Get value from keyPath.
 * @param { any } obj - Object to process.
 * @param { string } keyPath - String path to value with dot separators, eg: path.to.value 
 */
function getNestedValue( obj: any, keyPath: string ): any;

/**
 * Filter collection by properties and search string.
 * @param { any[] } collection - Array to filter.
 * @param { string[] } properties - Properties to filter collection by.
 * @param { string } searchString - Value to filter array by.
 */
function filterCollection( collection: any[], properties: string[], searchString: string ): any[];

/**
 * Make a deep copy of an objct and allow concatenation with another object.
 * @param { any } data - Object to copy
 * @param { any } [extensions] - Data to be added.
 */
function deepCopy( data: any, extensions?: any ): any;

/**
 * Return a JSON object of the organisation tree.
 * @param { OrgModel } orgTreeData
 * @param { string[] } [openedNodes]
 */
function getJSTreeData( orgTreeData: OrgModel, openedNodes?: string[] ): TreeNodeModel;

/**
 * Get items by index
 * @param { Array<T> } collection
 * @param { number[] } indexes
 */
function getItemsByIdx<T>( collection: Array<T>, indexes: number[] ): Array<T>;
```