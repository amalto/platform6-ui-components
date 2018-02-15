```javascript
const { createHashHistory } = require('history');
const {
    api,
    showDialog,
    hideDialog,
    displayNotification,
    handleErrorDisplay
} = require('./test/Mock.ts');

const formData = {
    content: '',
    model: {
        name: 'John',
        age: 30,
        country: 'France'
    }
};

const appHistory = createHashHistory();

<CustomFormDialog api={api}
    appHistory={appHistory}
    title='CustomFormDialog example'
    formData={formData}
    refreshData={() => {}}
    closeForm={() => {
        hideDialog()
    }}
    confirmAction={() => {}}
    showDialog={showDialog}
    hideDialog={hideDialog}
    displayNotification={displayNotification}
    handleErrorDisplay={handleErrorDisplay}
    locale='en-US'
/>
```