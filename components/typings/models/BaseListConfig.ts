import { ServiceItemFacade, ServiceItemFacades } from '@amalto/service-helpers'

export interface BaseListConfig {
    viewTabRenderer: ( viewId: string, item: ServiceItemFacade, closeTab: () => void ) => JSX.Element;
    editTabRenderer: ( editId: string, item: ServiceItemFacade, closeTab: () => void, items: ServiceItemFacades ) => JSX.Element;
    addTabRenderer: ( addId: string, closeTab: () => void, items: ServiceItemFacades ) => JSX.Element;
    readPermission?: string;
    editPermission?: string;
    deletePermission?: string;
    customItemNameValidation?: ( value: string ) => string;
    closeTabCallback?: ( closedTabId: string ) => void;
}