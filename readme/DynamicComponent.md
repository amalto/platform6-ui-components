Root component of all services.

```typescript
interface DynamicComponent {

    /** Interface used to perform all the api call to the server. More details on [WebApi](#webapi). */
    api: WebApi;
    
    /** Allow you to handle your navigation. */
    appHistory: History;

    /** Actions controlling the DataGrid template such as sorting order or column width. */
    dataGridActions: any;
    
    /** Component to be display by an eval. */
    componentScript: string;
    
    /** Component data to be passed has props. */
    componentData?: any;
    
    /** Refresh data to be passed to component. */
    refreshData?: () => void;
    
    /** Context data saved into store to be restored on serveur. */
    contextData?: any;
    
    /** Store component data inside the store as contextData. */
    storeContext?: ( contextData: any ) => void;
    
    /** Set dirty status of the component. */
    setStatus?: ( hasUnsavedChanges: boolean ) => void;
    
    /** Component height. */
    height?: number;
    
    /** Component fullscreen status. */
    fullscreen?: boolean;
    
    /** Manage component fullscreen status. */
    setFullscreen?: ( fullscreen: boolean ) => void;
    
    /** Reload tooltip if not displayed correctly. */
    reloadTooltips?: () => void;
    
    /** Show current job status. */
    showJobStatus?: ( jobId: string | number, callbackOnComplete?: ( job: RunningJob ) => void ) => void;
    
    /** If any application publisher profile is accessible to user. */
    canSelectAppKey?: boolean;

    /** Current application publisher profile object selected. More details on [AppKey](#appkey). */
    selectedAppKey?: AppKey;
    
    /** Current application publisher profile name selected. */
    selectedAppKeyName?: string;
    
    /** Application publisher profile is installed. */
    hasAppKeyInstalled?: ( appKeyName: string ) => boolean;
    
    /** Handle display of bach operations in case some of the operation fails and other succeed. */
    handleBatchOperationReportDisplay?: ( report: BatchOperationReport ) => void;

    /** Display the custom confirmation modal. */
    showDialog: ( title: string, body: React.ReactElement<any> | string, confirmAction?: any, cancelAction?: any, confirmLevel?: string, itemsList?: string[] ) => void;
    
    /** Hide the confirmation modal. */
    hideDialog: () => void;
    
    /** Display a custom notification. More details on [NotificationModel](#notificationmodel). */
    displayNotification: ( notificationOptions: NotificationModel ) => void;
    
    /** Display an error notification for  */
    handleErrorDisplay: ( error: any ) => void;

    /** Define the language to use. e.g: 'en-US' */
    locale: string;

}
```