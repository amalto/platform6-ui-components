```javascript
const { reduxForm } = require('redux-form');

const ExampleCheckboxes = reduxForm({
    form: 'form-checkbox-input-example',
    enableReinitialize: true
})(CheckboxesInput);

const options = [
    { value: 'first', label: 'first' },
    { value: 'second', label: 'second' }
];

<ExampleCheckboxes name='checkbox-input-example'
    label='CheckboxesInput example'
    options={options}
    disabled={false}
    help='Helper text'
    containerClass='padded'
    inputClass='info-color mgr-10'
    collapseErrorSpace={true}
/>
```