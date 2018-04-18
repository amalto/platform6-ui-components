```typescript
interface BaseListConfig {

    /** Render readonly view to display the item. */
    viewTabRenderer: ( item: ServiceItemFacade, closeTab: () => void ) => JSX.Element;

    /** Render form view to edit an item. */
    editTabRenderer: ( item: ServiceItemFacade, closeTab: () => void ) => JSX.Element;

    /** Render new form to add an item. */
    addTabRenderer: ( closeTab: () => void ) => JSX.Element;

    /**
     * Complete read permission, e.g: "home=read".
     * If not provided, will use the service id, e.g: "{serviceId}=read".
     */
    readPermission?: string;

    /**
     * Complete edit permission, e.g: "home=edit".
     * If not provided, will use the service id, e.g: "{serviceId}=edit".
     */
    editPermission?: string;

    /**
     * Complete edit permission, e.g: "home=edit".
     * If not provided, will use the service id, e.g: "{serviceId}=edit".
     */
    deletePermission?: string;

    /** Validation method for the name input of each items. */
    customItemNameValidation?: ( value: string ) => string;

    /** Method triggered after a tab has been closed. */
    closeTabCallback?: ( closedTabId: string ) => void;
}
```