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

<DynamicComponent api={api}
    appHistory={appHistory}
    componentScript=''
    componentData={{ iconClass: 'fa fa-info', btnClass: 'btn btn-trans btn-info' }}
    showDialog={showDialog}
    hideDialog={hideDialog}
    displayNotification={displayNotification}
    handleErrorDisplay={handleErrorDisplay}
    locale='en-US'
/>
```