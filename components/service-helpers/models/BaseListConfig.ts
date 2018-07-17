import { Id, ServiceItemFacade, ServiceItemFacades } from './ServiceHelpers'
import ButtonsBar from '@amalto/buttons-bar'

export interface BaseListConfig {
    viewTabRenderer?: ( viewId: string, item: ServiceItemFacade, closeTab: () => void, refreshItems: () => void ) => JSX.Element;
    editTabRenderer: ( editId: string, item: ServiceItemFacade, closeTab: () => void, items: ServiceItemFacades, formId: string, refreshItems: () => void ) => JSX.Element;
    addTabRenderer: ( addId: string, closeTab: () => void, items: ServiceItemFacades, formId: string, openEditTab?: ( tabId: string, id: Id ) => void ) => JSX.Element;
    readPermission?: string;
    editPermission?: string;
    deletePermission?: string;
    customItemNameValidation?: ( value: string ) => string;
    closeTabCallback?: ( closedTabId: string, formId: string ) => void;
    editOnDoubleClick?: boolean;
    openEditTabOnCreation?: boolean;
    customButtons?: ButtonsBar.BtnGroupsProps[];
    customItemActions?: ( item: ServiceItemFacade ) => JSX.Element;
    customActionsColumnWidth?: number;
    customColumns?: {
        columnId: string;
        label: string | JSX.Element;
        defaultVisible?: boolean;
        allowFiltering?: boolean;
        width?: number;
        textAlign?: string;
        displayFunction?: ( value: any, item: ServiceItemFacade, refreshItems: () => void ) => string | JSX.Element;
        disableSort?: boolean;
    }[];
    customEndpoints?: {
        getItems?: string;
        deleteItems?: string;
        exportItems?: string;
        importItems?: string;
        renameItem?: string;
        duplicateItem?: string;
    }
}