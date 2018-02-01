```javascript
const { reduxForm } = require('redux-form');

const ExampleCheckboxInput = reduxForm({
    form: 'form-checkbox-input-example',
    enableReinitialize: true
})(CheckboxInput);

<ExampleCheckboxInput name='checkbox-input-example'
    label='CheckboxInput example looooooooong'
    disabled={false}
    help='Helper text'
    containerClass='padded'
    inputClass='info-color'
    collapseErrorSpace={true}
/>
```