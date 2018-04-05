```javascript
const PagingControls = require('@amalto/paging-controls').default;
const { IntlProvider } = require('react-intl');

initialState = { currentPage: 1 };

function handlePageChange( newPage ) {
    setState({ currentPage: newPage })
}

<IntlProvider locale='en-US'>
    <PagingControls containerClass='padded'
        currentPage={state.currentPage}
        totalPages={2}
        handlePageChange={handlePageChange}
        locale='en-US'
    />
</IntlProvider>
```