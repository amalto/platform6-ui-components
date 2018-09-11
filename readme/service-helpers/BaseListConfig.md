Those methods are used to display each tabs from your service. It is used on [DymanicComponent](#dynamiccomponent).

```typescript
interface BaseListConfig {

    /**
     * Render readonly view to display the item.
     * 
     * @param { string } viewId
     * @param { ServiceItemFacade } item
     * @param { () => void } closeTab
     */
    viewTabRenderer: ( viewId: string, item: ServiceItemFacade, closeTab: () => void ) => JSX.Element;

    /**
     * Render form view to edit an item.
     * 
     * @param { string } editId
     * @param { ServiceItemFacade } item
     * @param { () => void } closeTab
     * @param { ServiceItemFacades } items
     * @param { string } formId
     */
    editTabRenderer: ( editId: string, item: ServiceItemFacade, closeTab: () => void, items: ServiceItemFacades, formId: string ) => JSX.Element;

    /**
     * Render new form to add an item.
     * 
     * @param { string } addId
     * @param { () => void } closeTab
     * @param { ServiceItemFacades } items
     * @param { string } formId
     * @param { ( tabId: string, id: Id ) => void } [openEditTab] - Open "edit" tab on creation if provided.
     */
    addTabRenderer: ( addId: string, closeTab: () => void, items: ServiceItemFacades, formId: string, openEditTab?: ( tabId: string, id: Id ) => void ) => JSX.Element;

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

    /**
     * Validation method for the name input of each items.
     * 
     * @param { string } value
     */
    customItemNameValidation?: ( value: string ) => string;

    /**
     * Validation methods' array on permission edit.
     * 
     * @param { ServiceItemFacade } item
     */
    editConditions?: ( ( item: ServiceItemFacade ) => boolean )[];

    /**
     * Method triggered after a tab has been closed.
     * 
     * @param { string } closedTabId
     */
    closeTabCallback?: ( closedTabId: string ) => void;

    /**
     * If true, open "edit" tab instead of "view" tab on double click.
     */
    editOnDoubleClick?: boolean;

    /**
     * If true, will open the "edit tab of the item you have just created.
     */
    openEditTabOnCreation?: boolean;

    /**
     * Custom buttons to be added in the "ButtonsBar" component.
     */
    customButtons?: ButtonsBar.BtnGroupsProps[];
}
```