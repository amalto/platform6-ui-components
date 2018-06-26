### Usage

```typescript
import PagingControls from '@amalto/paging-controls'
```

```javascript
const { IntlProvider } = require('react-intl');

initialState = { currentPage: 1 };

function handlePageChange( newPage ) {
    setState({ currentPage: newPage })
}

<IntlProvider locale='en-US'>
    <PagingControls containerClass='col-lg-12 col-xs-12 padding-none'
        currentPage={state.currentPage}
        totalPages={2}
        handlePageChange={handlePageChange}
        locale='en-US'
    />
</IntlProvider>
```