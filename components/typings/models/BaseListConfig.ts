import { ServiceItemFacade } from '@amalto/service-helpers'

export interface BaseListConfig {
    viewTabRenderer: ( item: ServiceItemFacade, closeTab: () => void ) => JSX.Element;
    editTabRenderer: ( item: ServiceItemFacade, closeTab: () => void ) => JSX.Element;
    addTabRenderer: ( closeTab: () => void ) => JSX.Element;
    readPermission?: string;
    editPermission?: string;
    deletePermission?: string;
    customItemNameValidation?: ( value: string ) => string;
    closeTabCallback?: ( closedTabId: string ) => void;
}