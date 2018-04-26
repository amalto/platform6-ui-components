These methods will help you when implementing services.

```typescript
/**
 * Get the identifier of an item
 *
 * @param {ServiceItemFacade | ServiceItem} item
 * @returns {Id}
 */
function getId( item: ServiceItemFacade | ServiceItem ): Id;

/**
 * Return item index from ids array
 * @param { ItemFacade } item 
 * @param { Ids } ids
 * @return { number }
 */
function getItemIdx( item: ServiceItemFacade, ids: Ids ): number;

/**
 * Return items indexes from a ids array.
 * @param { ItemFacades } items 
 * @param { Ids } ids
 * @return { number[] }
 */
function getItemIndexes( items: ServiceItemFacades, ids: Ids ): number[];

/**
 * Convert a list of facades into a list of identifiers
 *
 * @param {ServiceItemFacades} facades
 * @returns {Id[]}
 */
function toIds( facades: ServiceItemFacades ): Id[];

/**
 * Check that an identifier is not already taken
 *
 * @param {Ids} ids
 * @param {Id} id
 * @returns {boolean}
 */
function isIdUnique( ids: Ids, id: Id ): boolean;

/**
 * Prettify an identifier
 *
 * @param {Id} id
 * @returns {string}
 */
function prettifyId( id: Id ): string;

/**
 * Stringify an identifier
 *
 * @param {Id} id
 * @returns {string}
 */
function stringifyId( id: Id ): string;

/**
 * Increment an item's name ( Handle duplicate names, one version on @amalto/helpers )
 *
 * @param {ServiceItemFacades} facades
 * @param {Id} id
 * @returns {string}
 */
function incrementName( facades: ServiceItemFacades, id: Id ): string;

/**
 * Validate the new name of an item
 *
 * @param {string} value
 * @param {Id} id
 * @param {ServiceItemFacades} items
 * @returns {string}
 */
function validateName( value: string, id: Id, items: ServiceItemFacades, locale: string ): string;

/**
 * Found a specific item in a list
 *
 * @param {ServiceItemFacades} facades
 * @param {Id} id
 * @returns {ServiceItemFacade | undefined}
 */
function getItem( items: ServiceItemFacades, id: Id ): ServiceItemFacade | undefined;

/**
 * Display a date in the specified language
 *
 * @param {number} timestamp
 * @param {string} locale
 * @returns {string}
 */
function formatDate( timestamp: number, locale: string ): string;

/**
 * Get the VIEW identifier of an item (used in Tab component as ID).
 *
 * @param {ServiceItemFacade} item
 * @returns {string}
 */
function getViewId( item: ServiceItemFacade ): string;
/**
 * Get the EDIT identifier of an item (used in Tab component as ID).
 *
 * @param {ServiceItemFacade} item
 * @returns {string}
 */
function getEditId( item: ServiceItemFacade ): string;

/**
 * Get the ADD identifier (used in Tab component as ID).
 * 
 * @return { string }
 */
function getAddId(): string;

/**
 * Handle ServiceItemFacade duplicate name. It work the same as "handleDuplicateNameFromArray"
 * but for "ServiceItemFacade".
 * @param { Id } id - Name to duplicate. 
 * @param { ServiceItemFacades } items - All items to compare the name to.
 */
function handleDuplicateServiceItemName( id: Id, items: ServiceItemFacades ): string;
```