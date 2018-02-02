See [redux-form](https://redux-form.com/6.0.0-rc.1/docs/api/reduxform.md/) documentation for reduxForm options.

```javascript
const { reduxForm } = require('redux-form');

const ExampleReadOnlyInput = reduxForm({
    initialValues: {
        'text-input-example': 'readonly input value'
    },
    form: 'form-text-input-example',
    enableReinitialize: true
})(ReadOnlyInput);

<ExampleReadOnlyInput name='text-input-example'
    label='ReadOnlyInput example'
    help='Helper text'
    containerClass='padded'
    inputClass='text-large'
    collapseErrorSpace={true}
/>
```