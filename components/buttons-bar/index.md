```javascript
const ButtonsBar = require('@amalto/buttons-bar').default;

initialState = { searchValue: '' };

const btnGroups = [
    {
        btns: [
            {
                iconClass: 'fas fa-info',
                cssClass: 'btn btn-info',
                text: 'Info button',
                tooltipText: 'Info button tooltip'
            },
            {
                iconClass: 'fas fa-trash-alt',
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