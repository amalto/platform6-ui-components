```javascript
initialState = { searchValue: '' };

const btnGroups = [
    {
        btns: [
            {
                iconClass: 'fa fa-info',
                cssClass: 'btn btn-info',
                text: 'Info button',
                tooltipText: 'Info button tooltip'
            },
            {
                iconClass: 'fa fa-trash',
                cssClass: 'btn btn-trans btn-danger',
                tooltipText: 'Delete'
            }
        ]
    }
];
const handleSearch = searchValue => setState({ searchValue });

<ButtonsBar handleSearch={handleSearch}
    searchValue={state.searchValue}
    btnGroups={btnGroups}
    locale='en-US'
/>
```