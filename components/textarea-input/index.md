See [redux-form](https://redux-form.com/6.0.0-rc.1/docs/api/reduxform.md/) documentation for reduxForm options.

```javascript
const { reduxForm } = require('redux-form');

const ExampleTextareaInput = reduxForm({
    form: 'form-text-input-example',
    enableReinitialize: true
})(TextareaInput);

<ExampleTextareaInput name='textarea-input-example'
    label='TextareaInput example'
    disabled={false}
    help='Helper text'
    containerClass='padded'
    inputClass='text-large'
    collapseErrorSpace={true}
/>
```