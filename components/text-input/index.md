```javascript
const { reduxForm } = require('redux-form');

const ExampleTextInput = reduxForm({
    form: 'form-text-input-example',
    enableReinitialize: true
})(TextInput);

<ExampleTextInput name='text-input-example'
    label='TextInput example'
    placeholder='TextInput placeholder'
    disabled={false}
    help='Helper text'
    containerClass='padded'
    inputClass='text-large'
    type='text'
    autofocus={true}
    randomGenerator={true}
    collapseErrorSpace={true}
/>
```