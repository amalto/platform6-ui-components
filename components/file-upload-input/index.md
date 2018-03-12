See [redux-form](https://redux-form.com/6.0.0-rc.1/docs/api/reduxform.md/) documentation for reduxForm options.

```javascript
const { reduxForm } = require('redux-form');

const ExampleFileUploadInput = reduxForm({
    form: 'form-file-upload-input-example',
    enableReinitialize: true
})(FileUploadInput);

<ExampleFileUploadInput locale='en-US'
    name='file-upload-input-example-name'
    label='FileUploadInput example'
    disabled={false}
    help='FileUploadInput help'
    displayPreview={false}
    collapseErrorSpace={true}
    locale='en-US'
/>
```