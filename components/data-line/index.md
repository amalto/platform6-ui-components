```javascript
const cells = [
    {
        displayValue: 'first cell',
        columnId: 'cell-1',
        cssClass: 'multiline',
        display: true,
        readOnly: false,
        isEdited: false,
        lastEditable: false,
        options: [],
        validate: ( value ) => undefined
    }
];
const sgleClickHandler = () => {};
const dbleClickHandler = () => {};
const cellEditHandler = ( key, value ) => {};
const enterPressHandler = () => {};
const tabOnLastCellCallback = () => {};

initialState = {
    editMode: false,
    isNew: false
};

<DataLine cells={cells}
    sgleClickHandler={sgleClickHandler}
    dbleClickHandler={dbleClickHandler}
    cellEditHandler={cellEditHandler}
    enterPressHandler={enterPressHandler}
    tabOnLastCellCallback={tabOnLastCellCallback}
    editMode={state.editMode}
    isNew={state.editMode}
    style={{}}
    cssClass=''
/>
```