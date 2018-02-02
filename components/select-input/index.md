See [redux-form](https://redux-form.com/6.0.0-rc.1/docs/api/reduxform.md/) documentation for reduxForm options.

```javascript
const { reduxForm } = require('redux-form');

const ExampleSelectInput = reduxForm({
    form: 'form-select-input-example',
    enableReinitialize: true
})(SelectInput);

const options = [
    { value: 'first', label: 'first', disabled: false },
    { value: 'second', label: 'second', disabled: true },
    { value: 'third', label: 'third', disabled: false }
];

<ExampleSelectInput name='select-input-example'
    label='SelectInputInput example'
    options={options}
    disabled={false}
    help='Helper text'
    containerClass='padded'
    inputClass='info-color'
    hideEmptyOption={true}
    collapseErrorSpace={true}
/>
```