Interfaces used to define items returned by service root component.

```typescript
/** Unique id of any "ServiceItem" and "ServiceItemFacade" */
export interface Id {

    /** Item name. */
    name: string

    /** Item application publisher profile. */
    appKey: string
}

/**
 * Description object format, each key is the language for the description associated.
 */
export interface Description { [lang: string]: string }

/**
 * Data of an item that will be displayed on a list.
 */
export interface ServiceItemFacade extends Id {

    /** Language of the description depend on the user language preference. */
    description: string

    /** Content mode calculated based on the item current mode en the user permission. */
    calculatedContentMode: string

    /** Information on the application. */
    appInfo?: string

    /** Appliction name. */
    appName?: string;

    /** Last user who has modified the item. */
    lastModifiedBy?: string

    /** Last time when the item has been modified. */ 
    lastModifiedDate?: number

    /** Id used to handle conflict between different save if several people are working on the same item. */
    revisionId?: string
}

/**
 * All informations of an item.
 */
export interface ServiceItem extends Id {

    /** Description in all languages. */
    description: Description

    /** Last user who has modified the item. */
    lastModifiedBy?: string

    /** Last time when the item has been modified. */ 
    lastModifiedDate?: string

    /** Document accessibility. */
    contentMode: string

    /** Id used to handle conflict between different save if several people are working on the same item. */
    revisionId?: string
}

export declare type ServiceItems = ServiceItem[]
export declare type ServiceItemFacades = ServiceItemFacade[]
export declare type Ids = Id[]
export declare type CompiledWordings = Description
```