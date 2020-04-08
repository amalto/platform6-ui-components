Interfaces use in services.

```typescript

/** Item id. */
export interface Id {
    name: string;
    appKey: string;
}

/** Multilanguage description. */
export interface Description {
    [lang: string]: string;
}

/** Item received when fetching the service items list. */
export interface ServiceItemFacade extends Id {

    /** Item's description. */
    description: string;

    /** Item's access on the item. */
    calculatedContentMode: string;

    /** Appliction informations. */
    appInfo?: string;

    /** Appliction name. */
    appName?: string;

    /** User's email whom have last modified the item. */
    lastModifiedBy?: string;

    /** Timestamp of the last time the item has been modified. */
    lastModifiedDate?: number;

    /** Id handeling conflict on server. */
    revisionId?: string;
}

/** Item received when fetching a single item, allowing creation and update. */
export interface ServiceItem extends Id {

    /** Multilanguage description. */
    description: Description;

    /** User's email whom have last modified the item. */
    lastModifiedBy?: string;

    /** Timestamp of the last time the item has been modified. */
    lastModifiedDate?: number;

    /** Item's access on item data. */
    contentMode: string;

    /** Id handeling conflict on server. */
    revisionId?: string;
}

export declare type ServiceItems = ServiceItem[]

export declare type ServiceItemFacades = ServiceItemFacade[]

export declare type Ids = Id[]
```