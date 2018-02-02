```javascript
const { reduxForm } = require('redux-form');

const ExampleSelectInput = reduxForm({
    form: 'form-checkbox-input-example',
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