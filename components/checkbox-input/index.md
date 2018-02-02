See [redux-form](https://redux-form.com/6.0.0-rc.1/docs/api/reduxform.md/) documentation for reduxForm options.

```javascript
const { reduxForm } = require('redux-form');

const ExampleCheckboxInput = reduxForm({
    form: 'form-checkbox-input-example',
    enableReinitialize: true
})(CheckboxInput);

<ExampleCheckboxInput name='checkbox-input-example'
    label='CheckboxInput example'
    disabled={false}
    help='Helper text'
    containerClass='padded'
    inputClass='info-color'
    collapseErrorSpace={true}
/>
```