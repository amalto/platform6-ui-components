DataGrid uses [ColumnHeader](#columnheader), [DataGridTemplates](#datagridtemplates) and [WebStorage](#webstorage) Interfaces.

This component is not a stand-alone component because its functionalities use actions from the core.

```typescript
import { DataGrid } from '@amalto/platform6-ui'
```

```typescript
export module DataGrid {

        /** Must be added to allow templating. */
        dataGridId?: string;

        /** ServiceId used if the datagrid isn't part of a service */
        forcedServiceId?: string

        /** If you want to prevent templating but need to give the "dataGridId" props, set this value to false. */
        preventTemplating?: boolean;

        /** Column data array to be displayed. More details on "ColumnHeader". */
        columnHeaders: ColumnHeader[];
        
        /** Array of "DataLine" components to be displayed. */
        dataLines: JSX.Element[];
        
        /** Set true to display a spinner if "columnHeaders" is being poll from request. */
        fetchingHeaders?: boolean;
        
        /** Set true to hide "DataGrid" body if "dataLines" is being poll from request. */
        fetchingItems?: boolean;
        
        /** Message displayed when no items is provided. */
        noItemsMsg?: string;
        
        /** Event triggered when clicking on an header item. */
        sortHandler?: ( columnId: string, sortDirection: string ) => void;
        
        /** Column being sorted. */
        sortColumn?: string;
        
        /** Sort direction. */
        sortDirection?: string;

        /** Give the selected items. */
        selectHandler?: ( selectedItemsIdx: number[] ) => void;
        
        /** Index of the selected items. */
        selectedItems?: number[];
        
        /** Displayed when right clicking on selected items. */
        selectionContextMenu?: JSX.Element;
        
        /** Force update grid id updated. */
        resetTick?: number;

        /** If true, column header will be visible on top if user scroll down. */
        stickyHeader?: boolean;

        /** Cuztomization state. More details on "DataGridTemplates". */
        templates?: DataGridTemplates;
        
        /** If templates has changed. */
        templatesChanged?: boolean;
        
        /** Current instance selected. */
        selectedAppInstanceName?: string;
        
        /** Default service id. */
        defaultServiceId?: string
        
        /**
         * User information store inside browser local storage.
         * Accessible via "WebStorage".
         */
        user?: UserModel;
}
```