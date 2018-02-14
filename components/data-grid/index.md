DataGrid customization is not working as well as sorting order. It need to be connected to the store in order to handle those functionalities.

```javascript
const DataLine = require('@amalto/data-line').default;

const {
    api,
    displayContextMenu,
    hideContextMenu,
    receiveUserInfo,
    displayNotification,
    handleErrorDisplay,
    showDialog,
    hideDialog
} = require('./test/Mock.tsx');

initialState = { columnId: 'name', sortDirection: 'DESC', selectedItemsIdx: [] };

const columnHeaders = [
    {
        id: 'name',
        label: 'Name',
        display: true,
        color: '#000000',
        width: 150,
        textAligne: 'left',
        disableClick: false
    },
    {
        id: 'age',
        label: 'Age',
        display: true,
        color: '#000000',
        width: 150,
        textAligne: 'left',
        disableClick: false
    },
    {
        id: 'country',
        label: 'Country',
        display: true,
        color: '#000000',
        width: 150,
        textAligne: 'left',
        disableClick: false
    }
];

const dataLines = [
    <DataLine cells={[
        { displayValue: 'John', columnId: 'name'},
        { displayValue: '30', columnId: 'age'},
        { displayValue: 'France', columnId: 'country'}
    ]}
        cssClass='multiline'
    />,
    <DataLine cells={[
        { displayValue: 'Brian', columnId: 'name'},
        { displayValue: '20', columnId: 'age'},
        { displayValue: 'Australia', columnId: 'country'}
    ]}
        cssClass='multiline'
    />,
    <DataLine cells={[
        { displayValue: 'Diego', columnId: 'name'},
        { displayValue: '25', columnId: 'age'},
        { displayValue: 'Mexico', columnId: 'country'}
    ]}
        cssClass='multiline'
    />,
    <DataLine cells={[
        { displayValue: 'Juan', columnId: 'name'},
        { displayValue: '34', columnId: 'age'},
        { displayValue: 'Spain', columnId: 'country'}
    ]}
        cssClass='multiline'
    />
    
];

<DataGrid api={api}
    displayContextMenu={displayContextMenu}
    hideContextMenu={hideContextMenu}
    receiveUserInfo={receiveUserInfo}
    displayNotification={displayNotification}
    handleErrorDisplay={handleErrorDisplay}
    showDialog={showDialog}
    hideDialog={hideDialog}

    dataGridId='props-data-grid-id-example'
    forcedServiceId='props-forced-service-id-example'
    preventTemplating={true}
    columnHeaders={columnHeaders}
    dataLines={dataLines}
    fetchingHeaders={false}
    fetchingItems={false}
    noItemsMsg='No item provided'
    sortHandler={( columnId, sortDirection ) => setState({ columnId, sortDirection })}
    sortColumn={state.columnId}
    sortDirection={state.sortDirection}
    selectHandler={( selectedItemsIdx ) => setState({ selectedItemsIdx })}
    selectedItems={state.selectedItemsIdx}
    selectionContextMenu={null}
    resetTick={0}
    stickyHeader={true}
    templates={null}
    templatesChanged={false}
    selectedAppInstanceName='test'
    defaultServiceId='documentation'
    user={null}
    locale='en-US'
/>
```