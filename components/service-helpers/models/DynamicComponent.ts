// Models
import {
    AppKey,
    NotificationModel,
    BatchOperationReport,
    WebApi,
    UserModel,
    ReduxProps
} from '@amalto/typings'

import { History } from 'history'

import { BaseListConfig } from './BaseListConfig'

export interface DynamicComponent extends ReduxProps {

    /** Interface used to perform all the api call to the server. */
    api: WebApi;

    /** Allow you to handle your navigation. */
    appHistory: History;

    /** Actions controlling the DataGrid template such as sorting order or column width. */
    dataGridActions: any;

    /** Component to be display by an eval. */
    componentScript: string;

    /** Component data to be passed has props. */
    componentData?: any;

    /** Portal run on http. */
    isHttp?: boolean;

    /** Proxy URI used to make request on server. */
    proxyUri?: string;
    
    /** Refresh data to be passed to component. */
    refreshData?: () => void;

    /** Context data saved into store to be restored on serveur. */
    contextData?: any;

    /**
     * Store component data inside the store as contextData.
     * @param { any } contextData
     */
    storeContext?: ( contextData: any ) => void;

    /**
     * Save user json content.
     * @param { string } userEmail
     * @param { any } jsonContent Should be a vaild JSON object.
     */
    saveUserJSONContent?: ( userEmail: string, jsonContent: any ) => void;

    /**
     * Save template into user configuration settings.
     * @param { UserModel } payload
     */
    saveDataGridTemplate?: ( payload: UserModel ) => void;

    /**
     * Display column header configuration popup.
     * @param { any } content
     * @param { number } [positionX]
     * @param { number } [positionY]
     */
    displayContextMenu: ( content: any, positionX?: number, positionY?: number ) => void;

    /**
     * Hide context menu.
     */
    hideContextMenu: () => void;

    /**
     * Set dirty status of the component.
     * If true a comfirmation modal will shows up if you try to move to another menu.
     * @param { boolean } hasUnsavedChanges
     * @param { string } tabId
     */
    setStatus?: ( hasUnsavedChanges: boolean, tabId?: string ) => void;

    /** Component height. */
    height?: number;

    /** Component fullscreen status. */
    fullscreen?: boolean;

    /** Manage component fullscreen status. */
    setFullscreen?: ( fullscreen: boolean ) => void;

    /** Reload tooltip if not displayed correctly. */
    reloadTooltips?: () => void;

    /**
     * Show current job status.
     * @param { string | number } jobId
     * @param { ( result: any ) => void } onSuccess
     */
    showJobStatus?: ( jobId: string | number, onSuccess?: ( result: any ) => void ) => void;

    /** List of complete jobs IDs */
    completeJobs?: number[];

    /** List of finished with error(s) jobs IDs */
    inErrorJobs?: number[];

    /** If any application publisher profile is accessible to user. */
    canSelectAppKey?: boolean;

    /** Current application publisher profile object selected. */
    selectedAppKey?: AppKey;

    /** Current application publisher profile name selected. */
    selectedAppKeyName?: string;

    /**
     * Application publisher profile is installed.
     * @param { string } appKeyName
     */
    hasAppKeyInstalled?: ( appKeyName: string ) => boolean;

    /**
     * Handle display of bach operations in case some of the operation fails and other succeed.
     * @param { BatchOperationReport } report
     */
    handleBatchOperationReportDisplay?: ( report: BatchOperationReport ) => void;

    /**
     * Display the custom confirmation modal.
     * @param { string } title
     * @param { React.ReactElement<any> | string } body
     * @param { any } [confirmAction]
     * @param { any } [cancelAction]
     * @param { string } [confirmLevel]
     * @param { any[] } [itemsList]
     */
    showDialog: ( title: string, body: React.ReactElement<any> | string, confirmAction?: any, cancelAction?: any, confirmLevel?: string, itemsList?: any[] ) => void;

    /** Hide the confirmation modal. */
    hideDialog: () => void;

    /**
     * Display a custom notification. More details on [NotificationModel](#notificationmodel).
     * @param { NotificationModel } notificationOptions
     */
    displayNotification: ( notificationOptions: NotificationModel ) => void;

    /**
     * Display an error notification for failed request.
     * @param { any } error
     */
    handleErrorDisplay: ( error: any ) => void;

    /**
     * Render generic "Tabs" component with items list and views.
     * 
     * @param { BaseListConfig } config
     * @return { JSX.Element }
     */
    renderBaseServiceList?: ( config: BaseListConfig ) => JSX.Element;

    /**
     * Refresh the status of the service (running/stopped/running but needs restarting).
     */
    refreshServiceStatus?: () => void;

    /**
     * Lock the service
     * 
     * @param { boolean } lock
     */
    lockService?: ( lock: boolean ) => void;

    /**
     * Language to use on the component. e.g: "en-US".
     * Locales available at [Locale](#locale).
     */
    locale: string;

}


export default DynamicComponent